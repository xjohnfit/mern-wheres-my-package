import { useContext, useEffect, useState } from 'react';
import AppContext from './context/AppContext';
import toast from 'react-hot-toast';

const Track = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [trackingNumberInput, setTrackingNumberInput] = useState('');

    const { userData } = useContext(AppContext);
    const { trackingNumbers, setTrackingNumbers } = useContext(AppContext);

    useEffect(() => {
        const fetchTrackingNumbers = async () => {
            if (!userData?.token) return; // avoid unauthorized calls
            try {
                const response = await fetch(
                    `${apiBaseUrl}/packages/get-packages`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    return;
                }

                const data = await response.json();
                // Backend returns array of package objects; store only the trackingNumber strings in context
                setTrackingNumbers(
                    Array.isArray(data.packages)
                        ? data.packages.map(
                              (p: { trackingNumber: string }) =>
                                  p.trackingNumber
                          )
                        : []
                );
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch packages');
            }
        };

        fetchTrackingNumbers();
        // run once on mount or when token changes
    }, [userData?.token]);

    const handleAddPackage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!trackingNumberInput.trim()) {
            toast.error('Please enter a tracking number');
            return;
        }

        if (!userData || !userData.token) return;

        const response = await fetch(`${apiBaseUrl}/packages/add-package`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
                trackingNumber: trackingNumberInput.trim(),
            }),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success('Tracking number added successfully');
            setTrackingNumbers([...trackingNumbers, trackingNumberInput]);
            setTrackingNumberInput('');
        } else {
            toast.error(data.error || 'Failed to add tracking number');
            console.error(data.error);
        }
    };

    return (
        <div className='h-screen w-full flex flex-col items-center gap-6 pt-20'>
            <p className='w-full text-3xl text-left'>
                Hello, Welcome back, {userData?.fullName || 'Guest'}
            </p>
            <h1 className='text-4xl '>Start adding tracking numbers</h1>
            <form
                className='w-full'
                onSubmit={handleAddPackage}>
                <div className='w-full flex items-center justify-between gap-4'>
                    <input
                        className='w-[70%] h-20 border text-4xl border-gray-700 p-10'
                        type='text'
                        placeholder='Enter tracking number'
                        value={trackingNumberInput}
                        onChange={(e) => setTrackingNumberInput(e.target.value)}
                    />
                    <button
                        className='cursor-pointer w-fit border border-blue-300 px-20 py-5 rounded-xl text-xl shadow-2xl bg-blue-400 hover:bg-blue-500'
                        type='submit'>
                        Track This Package
                    </button>
                </div>
            </form>

            {trackingNumbers.length === 0 ? (
                <p>No tracking numbers added yet.</p>
            ) : (
                <ul className='w-full flex box-border gap-10 justify-between flex-wrap'>
                    <h3 className='w-full text-2xl font-bold'>
                        Packages Coming:
                    </h3>
                    {trackingNumbers.map((number, index) => (
                        <div
                            key={index}
                            className='w-[45%] border border-dashed border-gray-300 p-5 '>
                            <li>{number}</li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Track;
