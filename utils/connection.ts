
import mongoose from "mongoose";

const { NEXT_PUBLIC_MONGODB_URI } = process.env


if (!NEXT_PUBLIC_MONGODB_URI) {
    throw new Error("Invalid environment variable: MONGODB_URI");
}

export const connectToMongoDB = async () => {
    try {
        const { connection } = await mongoose.connect(NEXT_PUBLIC_MONGODB_URI)
        
        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectToMongoDB
