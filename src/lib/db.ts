
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
            .then((res) => {
                console.log(`Database Connected`);
                return "Database Connected"
            })
            .catch((error: Error) => {
                console.log(error.message);
                return error.message
            })
    } catch (error: any) {
        console.log(error.message);
        return error.message
    }
}

export default connectDB;