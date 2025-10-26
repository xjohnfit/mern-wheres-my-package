import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import AppContext from './context/AppContext';

interface RegisterData {
    email: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();
    const { setUserData } = useContext(AppContext);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const [data, setData] = useState<RegisterData>({
        email: '',
        password: '',
    });

    const submitRegisterForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiBaseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {

                setUserData(responseData.user);
                console.log('Login successful:', responseData);
                toast.success('Login successful!');

                // Reset the form and redirect the user
                setData({
                    email: '',
                    password: '',
                });
                
                navigate('/track');
            } else {
                console.error('Login failed:', responseData);
                toast.error(
                    `Login failed: ${responseData.message || 'Unknown error'}`
                );
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            toast.error(
                'An error occurred during login. Please try again later.'
            );
        }
    };

    return (
        <section className='h-screen flex flex-col items-center justify-center gap-8'>
            <div className='flex items-center justify-center flex-col gap-4'>
                <h1 className='text-3xl tracking-tight'>
                    Welcome Back, Please Login
                </h1>
            </div>
            <form
                className='flex flex-col gap-4'
                onSubmit={submitRegisterForm}>
                <div className='flex flex-col gap-5'>
                    <input
                        type='email'
                        placeholder='Email'
                        className='border p-2 w-full'
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        className='border p-2 w-full'
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </div>

                <button
                    type='submit'
                    className='bg-blue-500 text-white p-2 rounded-xl cursor-pointer hover:bg-blue-600 transition-colors'>
                    Login
                </button>
                <p>
                    Don't have an account? <Link to='/register'>Register</Link>
                </p>
            </form>
        </section>
    );
};
export default Login;
