import type { Request, Response} from 'express';

export const logoutController = (req: Request, res: Response) => {
    // Clear the authentication token cookie
    res.clearCookie('WIMPCookie', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logout successful' });
};