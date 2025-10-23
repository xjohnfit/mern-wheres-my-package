import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript interface for the User document
export interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the schema with TypeScript typing
const userSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Pre-save hook to hash password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Create and export the typed model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
