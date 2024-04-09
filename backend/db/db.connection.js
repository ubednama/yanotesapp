import mongoose from 'mongoose';

const connectToMongo = async() => {
    try{
        await mongoose.connect(process.env.URL);
        console.log("Connected to Mongo Successfully")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongo