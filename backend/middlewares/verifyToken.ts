import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                throw new Error();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Please authenticate' });
        }
    };

    return auth(req, res, next);
};
