import mongoose from "mongoose";

export default async function () {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URI)
        console.log("🚀 DB connected")
        
    } catch (error) {
        console.log("🚀 ~ register ~ error", error.message)

        process.exit(1)
    }
}