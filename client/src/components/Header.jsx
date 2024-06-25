import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='bg-slate-500'>
            <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
                <NavLink to='/'>
                    <h1 className="text-xl font-bold">Auth App</h1>
                </NavLink>
                <ul className='flex gap-4'>
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to='/about'><li>About</li></NavLink>
                    <NavLink to='/profile'>
                        {
                            currentUser ?(
                                <img src={currentUser.profilePicture} alt="profile" className=" h-7 w-7 rounded-full object-cover" />)
                                : (<li>Sign In</li>)
                        }

                    </NavLink>


                </ul>
            </div>
        </div>
    )
}
