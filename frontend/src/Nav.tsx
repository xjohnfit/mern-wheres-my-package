import { Link, useNavigate } from 'react-router';
import { ModeToggle } from './components/mode-toggle';
import AppContext from './context/AppContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const Nav = () => {
    const { userData, setUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        try {
            // Best-effort request to server to clear cookie (optional for header-based auth)
            await fetch(`${apiBaseUrl}/users/logout`, {
                method: 'GET',
                credentials: 'include',
            });
        } catch (error) {
            // Ignore network error for logout; we'll clear client state regardless
            console.error('Error logging out:', error);
        } finally {
            // Clear client auth state so protected routes are blocked immediately
            localStorage.removeItem('wimpUser');
            setUserData(null);
            toast.success('Logout successful!');
            navigate('/login', { replace: true });
        }
    };

    return (
        <nav className='flex items-center justify-between top-0 left-0 w-full'>
            <div className='w-full flex items-center justify-between gap-4'>
                <p className='text-3xl tracking-widest font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse'>
                    Where's My Package
                </p>
            </div>
            <div className='flex items-center justify-center gap-10'>
                <Link
                    to='/'
                    className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Home
                </Link>
                <Link
                    to='/track'
                    className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Track
                </Link>
                <Link
                    to='/about'
                    className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    About
                </Link>
                <Link
                    to='/contact'
                    className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Contact
                </Link>
            </div>

            <div className='w-full flex items-center justify-end gap-5'>
                {userData ? (
                    <div className='flex items-center justify-center gap-4'>
                        <Link
                            to='/my-profile'
                            className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                            My Profile
                        </Link>
                        <button
                            onClick={() => handleLogout()}
                            className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-4'>
                        <Link
                            to='/register'
                            className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                            Register
                        </Link>
                        <Link
                            to='/login'
                            className='text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                            Login
                        </Link>
                    </div>
                )}
                <ModeToggle />
            </div>
        </nav>
    );
};
export default Nav;
