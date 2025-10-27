import mongoose from 'mongoose';

/**
 * Establishes connection to MongoDB database
 * @throws {Error} If MONGO_URI is not defined or connection fails
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
    // Read environment variable inside the function, not at module level
    const mongoURI: string | undefined = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        process.exit(1);
    }

    console.log('🔗 Attempting to connect to MongoDB...');

    try {
        await mongoose.connect(mongoURI as string);
        console.log('✅ MongoDB connected successfully');

        // Handle connection events
        mongoose.connection.on('error', (err: Error) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ MongoDB connection error:', errorMessage);
        process.exit(1);
    }
};

export default connectDB;
