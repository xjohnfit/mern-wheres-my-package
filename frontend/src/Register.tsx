import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import AppContext from "./context/AppContext";
import { useNavigate } from "react-router";

interface RegisterData {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

const Register = () => {
    const navigate = useNavigate();
    const { setUserData, userData } = useContext(AppContext);

    useEffect(() => {
        console.log('Current userData from context:', userData);
    }, [userData]);
    
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const [data, setData] = useState<RegisterData>({
            fullName: '',
            userName: '',
            email: '',
            password: '',
            gender: '',
            address: '',
            city: '',
            state: '',
            zip: '',
        });

    const submitRegisterForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!data.fullName || !data.userName || !data.email || !data.password
            || !data.gender || !data.address || !data.city || !data.state || !data.zip){
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {

                setUserData({user: responseData.user, token: responseData.token});
                toast.success('Registration successful!');
                
                // Optionally, reset the form or redirect the user
                setData({
                    fullName: '',
                    userName: '',
                    email: '',
                    password: '',
                    gender: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                });

                navigate('/track');

            } else {
                console.error('Registration failed:', responseData);
                toast.error(`Registration failed: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
            toast.error('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <section className='h-screen flex flex-col items-center justify-center gap-8'>
            <div className='flex items-center justify-center flex-col gap-4'>
                <h1 className='text-3xl tracking-tight'>
                    Register and start tracking your packages
                </h1>
                <span>It's free no credit card required</span>
            </div>
            <form
                className='flex flex-col gap-4'
                onSubmit={submitRegisterForm}>
                <div className='flex gap-5 w-full'>

                    {/* TODO: edit fields border to red when input value is missing */}
                    <input
                        type='text'
                        placeholder='Full Name'
                        className={`border p-2 w-full ${!data.fullName ? 'border-red-500' : ''}`}
                        value={data.fullName}
                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        className={`border p-2 w-full ${!data.userName ? 'border-red-500' : ''}`}
                        value={data.userName}
                        onChange={(e) => setData({ ...data, userName: e.target.value })}
                    />
                </div>
                <div className='flex gap-5'>
                    <input
                        type='email'
                        placeholder='Email'
                        className={`border p-2 w-full ${!data.email ? 'border-red-500' : ''}`}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />

                    <input
                        autoComplete='new-password'
                        type='password'
                        placeholder='Password'
                        className={`border p-2 w-full ${!data.password ? 'border-red-500' : ''}`}
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                </div>
                <select className={`border p-2 text-gray-500 ${!data.gender ? 'border-red-500' : ''}`} value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}>
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                    <option value='prefer-not-to-say'>Prefer not to say</option>
                </select>
                <div className='flex flex-col gap-4 w-full'>
                    <input
                        type='text'
                        placeholder='Address'
                        className={`border p-2 w-full ${!data.address ? 'border-red-500' : ''}`}
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                    />
                    <div className='flex gap-5'>
                        <input
                            type='text'
                            placeholder='City'
                            className={`border p-2 w-full ${!data.city ? 'border-red-500' : ''}`}
                            value={data.city}
                            onChange={(e) => setData({ ...data, city: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='State'
                            className={`border p-2 w-full ${!data.state ? 'border-red-500' : ''}`}
                            value={data.state}
                            onChange={(e) => setData({ ...data, state: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='Zip'
                            className={`border p-2 w-full ${!data.zip ? 'border-red-500' : ''}`}
                            value={data.zip}
                            onChange={(e) => setData({ ...data, zip: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='bg-blue-500 text-white p-2'>
                    Register
                </button>
                <p>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </form>
        </section>
    );
};
export default Register;
