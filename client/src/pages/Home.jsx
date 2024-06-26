import React from 'react'

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-4xl font-bold m-4 text-slate-700 text-wrap text-center'>Welcome to my MERN Stack Authentication app</h1>
      <h1 className='font-bold'>Created By : <span className=' font-normal text-blue-800 underline' ><a href="https://github.com/nikumbhShubham">github.com/nikumbhShubham</a></span></h1>
      <h3 className='p-2 font-medium'>
        Technologies Used:
        <span className='font-normal'>MongoDB, Express.js, React.js, Node.js, Firebase</span>
      </h3>
      <h4 className='p-2 font-medium'>
        Additional Libraries and Tools:
        <span className='font-normal'>jsonwebtoken (JWT), Firebase Authentication, Redux Toolkit (RTK), redux-persist, bcryptjs, Tailwind CSS,react-router-dom</span>
      </h4>
      <p className='p-2'>
        The application leverages MongoDB for database management, Express.js for server-side routing, React.js for the front-end user interface, and Node.js for the back-end server environment. Firebase is utilized for Google OAuth authentication, while JWT handles token-based authentication. The Redux Toolkit is used for state management, with redux-persist ensuring state persistence across sessions. Password encryption is handled by bcryptjs, and Tailwind CSS is used for styling the application.
      </p>

      <p className='p-2'>
        This application serves as a practice platform for authentication, including both sign-in and sign-out functionality. It supports sign-in or sign-up using Google OAuth through Firebase.
      </p>
      <p className='p-2'>
        Users can upload their profile images; if a user does not upload an image, a default profile image will be used. The user state is persisted using (redux-persist), ensuring that user information remains intact even after the page is refreshed.
      </p>
      <p className='p-2'>
        The application employs token-based authentication using JSON Web Tokens (JWT). Upon successful authentication, a JWT is sent to the user as a cookie with a lifespan of one hour. This means that if the user closes the site and reopens it within one hour, they will remain signed in.
      </p>

    </div>
  )
}
