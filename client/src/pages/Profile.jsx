import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';



export default function Profile() {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [fromData, setFromData] = useState({})



  const { currentUser } = useSelector(state => state.user)


  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])
  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFromData({ ...fromData, profilePicture: downloadURL })
        )
      }
    );
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className=' flex flex-col gap-4' >


        <input type="file" ref={fileRef} hidden accept='imgage/*' onChange={(e) => setImage(e.target.files[0])} />

        <img className='h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2' 
        src={fromData.profilePicture || currentUser.profilePicture} alt="profilePicture" onClick={() => fileRef.current.click()} />




        <p className='text-sm self-center'>
          {
            imageError ? <span className="text-red-600">Error uploading image</span> :
              imagePercent > 0 && imagePercent < 100 ? <span className="text-green-600">Uploading {imagePercent}%</span> : <span className="text-green-600">Image Uploaded successfully!!</span>
          }
        </p>




        <input defaultValue={currentUser.username} type="text" name="username" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3' />

        <input defaultValue={currentUser.email} type="text" name="email" id="email" placeholder='email' className='bg-slate-100 rounded-lg p-3' />

        <input type="text" name="password" id="passwprd" placeholder='password' className='bg-slate-100 rounded-lg p-3' />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 '>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
