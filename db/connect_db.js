import mongoose from "mongoose";

async function connectDb(dburl) {
    try {
        await mongoose.connect(dburl)
        console.log("Db connection successfull")

    } catch (error) {
        console.log("Cant connect to db.")
    }
}

export default connectDb