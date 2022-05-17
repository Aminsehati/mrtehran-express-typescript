import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_NAME}.xc53v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
function connectDataBase() {
    mongoose.connect(url);
    mongoose.connection.on("error", (err) => {
        console.log("err", err);
    });
    mongoose.connection.on("connected", (err, res) => {
        console.log("mongoose is connected");
    });
}
export default connectDataBase