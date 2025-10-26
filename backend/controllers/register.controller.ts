import User from '../models/user.model.ts';
import jwt from 'jsonwebtoken';

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

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET is not set');

        const token = jwt.sign({ id: newUser._id }, secret, {
            expiresIn: '1h',
        });

        res.cookie('WIMPCookie', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};