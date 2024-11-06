import Dentists from "./models/dentists.model.js";
import Clinics from "./models/clinics.model.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongooseURL = process.env.MONGODB_URL_TEST;

await mongoose.connect(mongooseURL);
console.log('Connected to mongoDB');

await Clinics.create({
    Website: "test",
    Dentists: []
});

console.log('saved');
