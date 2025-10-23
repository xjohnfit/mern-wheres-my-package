import User from '../models/user.model.ts';

//Types import
import type { Request, Response } from 'express';
import type { IUser } from '../models/user.model.ts';

export const registerController = async (req: Request, res: Response) => {
    const {
        fullName,
        userName,
        email,
        password,
        gender,
        address,
        city,
        state,
        zip,
    } = req.body;

    try {
        const newUser: IUser = new User({
            fullName,
            userName,
            email,
            password,
            gender,
            address,
            city,
            state,
            zip,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
