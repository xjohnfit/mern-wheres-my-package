import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

//Define a schema for request validation
const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginRequestBody = z.infer<typeof loginSchema>;

// Extend Express Request type
interface TypedRequest<T> extends Request {
    body: T;
}

// Constants for better maintainability
const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    INTERNAL_ERROR: 500,
} as const;

const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    VALIDATION_ERROR: 'Validation failed',
    SERVER_ERROR: 'An error occurred during login',
} as const;

export const loginController = async (
    req: TypedRequest<LoginRequestBody>,
    res: Response
): Promise<Response> => {
    try {
        // Validate input
        const validationResult = loginSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: ERROR_MESSAGES.VALIDATION_ERROR,
                errors: validationResult.error.issues,
            });
        }

        const { email, password } = validationResult.data;

        const user = await User.findOne({ email }).select('+password');

        // Use timing-safe comparison - don't reveal if user exists
        if (!user) {
            // Hash a dummy password to prevent timing attacks
            await bcrypt.compare(
                password,
                'DummyHashToPreventTimingAttack'
            );
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: ERROR_MESSAGES.INVALID_CREDENTIALS
            });
        }

        // Success response
        return res.status(HTTP_STATUS.OK).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                // Include other safe user properties
            }
        });
    } catch (error) {
        // Log error for debugging (use proper logger in production)
        console.error('Login error:', error);

        return res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            message: ERROR_MESSAGES.SERVER_ERROR
        });
    }
};
