import type { Request, Response } from 'express';
import Track from '../models/track.model.ts';

export const addPackage = async (req: Request, res: Response) => {
    const { trackingNumber } = req.body;

    // Placeholder logic for tracking a package
    if (!trackingNumber) {
        return res.status(400).json({ error: 'Tracking number is required' });
    }

    try {
        const packageExists = await Track.findOne({ trackingNumber });
        if (!packageExists) {
            const newPackage = new Track({ trackingNumber });
            await newPackage.save();
            return res.status(201).json({ message: 'Package added successfully', newPackage });
        }
        return res.status(200).json({ message: 'You already added this package', packageExists });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

};

export const getPackages = async (req: Request, res: Response) => {
    try {
        const packages = await Track.find();
        return res.status(200).json({ packages });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};