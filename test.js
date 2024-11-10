import mongoose from "mongoose";
import dotenv from 'dotenv';
import TotalDentists from './models/dentists.model.js';
import ADADentists from './models-ada/dentists.model.js';
import AAODentists from './models-aao/dentists.model.js';

dotenv.config();
const mongooseURL = process.env.MONGODB_URL;

await mongoose.connect(mongooseURL);
console.log('Connected to mongodb');

console.log('----- start at first');

// console.log('----- start', cursor);
const existed = await ADADentists.findOne(
    // {Phone: "(703) 897-6453"}
    { Phone: "(703) 640-1000"}
);
console.log('---- existed: ', existed);

console.log('------------------ finish ');
await mongoose.connection.close();
console.log('Close the connection in mongoDB');
