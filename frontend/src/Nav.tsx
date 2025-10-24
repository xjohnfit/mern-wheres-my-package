import { Link } from 'react-router';
import { ModeToggle } from './components/mode-toggle';

const Nav = () => {
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

            <div className='w-full flex items-center justify-end gap-10'>
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
                <ModeToggle />
            </div>
        </nav>
    );
};
export default Nav;
