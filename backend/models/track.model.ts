import mongoose, { Document, Schema } from "mongoose";

export interface ITrack extends Document {
    trackingNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const trackSchema = new Schema<ITrack>({
    trackingNumber: { type: String, required: true },
}, { timestamps: true });

const Track = mongoose.model<ITrack>("Track", trackSchema);

export default Track;
