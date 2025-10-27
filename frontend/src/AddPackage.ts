import { useContext, useEffect, useState } from 'react';
import AppContext from './context/AppContext';

const { userData } = useContext(AppContext);
const { trackingNumbers, setTrackingNumbers } = useContext(AppContext);

export const handleAddPackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trackingNumber) {
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
        body: JSON.stringify({ trackingNumber }),
    });

    const data = await response.json();
    if (response.ok) {
        toast.success('Tracking number added successfully');
        setTrackingNumbers([...trackingNumbers, trackingNumber]);
        setTrackingNumber('');
    } else {
        toast.error(data.error || 'Failed to add tracking number');
        console.error(data.error);
    }
};
