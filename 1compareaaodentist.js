import mongoose from "mongoose";
import dotenv from 'dotenv';
import TotalDentists from './models/dentists.model.js';
// import ADADentists from './models-ada/dentists.model.js';
import AAODentists from './models-aao/dentists.model.js';

dotenv.config();
const mongooseURL = process.env.MONGODB_URL;

await mongoose.connect(mongooseURL);
console.log('Connected to mongodb');


console.log('----- start at first');
const cursor = await AAODentists.find().cursor();
let flag = false;
// console.log('----- start', cursor);
try{
    for(let doc = await cursor.next(); doc != null; doc = await cursor.next()){

        const phoneNumber = doc.phone.slice(0, 5) + ' ' + doc.phone.slice(5);
        // 17555, 21524
        if(doc.id == '24498'){
            flag = true;
        }
        console.log('------ start dentist: ', doc.id, phoneNumber);
        if(flag){
            const existed = await TotalDentists.findOne(
                {Phone: phoneNumber}
            );
            // console.log('---- existed: ', existed);

            if(existed){
                await TotalDentists.findOneAndUpdate(
                    { Phone: phoneNumber},
                    {
                        $set: {
                            Source: "both",
                            email: doc.email,
                        }
                    },
                    { upsert: true }
                );
                console.log('---- update dentist: ', doc.id, phoneNumber);
            }else{
                await TotalDentists.create(
                    {
                        email: doc.email,
                        Name: doc.store,
                        Address: doc.address,
                        Zip: doc.zip,
                        City: doc.city,
                        State: doc.state,
                        Phone: phoneNumber,
                        Website: doc.website,
                        Source: "aao",
                    }
                );
                console.log('---- create a new dentist: ', doc.id, phoneNumber);

            }

            // console.log('---- push dentist: ', addressId);
        }else{
            console.log('---- bypass dentist: ', doc.id);
            // await mongoose.connection.close();
        }
    }
}catch(error){
    console.log('---- storeadadentist Error: ', error);
}

console.log('------------------ finish ');
await mongoose.connection.close();
console.log('Close the connection in mongoDB');
