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
const cursor = await AAODentists.find().cursor();

// console.log('----- start', cursor);
try{
    for(let doc = await cursor.next(); doc != null; doc = await cursor.next()){
        let flag = false;
        const addressId = doc.AddressId;
        if(addressId == '3569802'){
            flag = true;
        }
        console.log(doc);
        if(flag){
            const newTotalDentists = new TotalDentists(doc);
            await newTotalDentists.save();
            // TotalDentists.findOneAndUpdate(
            //     {
                    
            //     }
            // )
            // await TotalDentists.update(doc);
            console.log('---- push dentist: ', addressId);
        }else{
            console.log('---- bypass dentist: ', addressId);
        }
    }
}catch(error){
    console.log('---- storeadadentist Error: ', error);
}


// const profile = await ADADentists.findOne(
//     {
//         PersonId: '100961'
//     },
//     // {
//     //     _id: false,
//     // }
// );
// console.log(profile);

// console.log(TotalDentists);
// console.log(ADADentists);

// (async () => {
//     await storeadadentist();
// })();

// const db = mongoose.connection.db;
// const collections = await db.listCollections().toArray();
// console.log('collections in the database:');
// collections.forEach(collection => {
//     console.log(collection.name);
// });

await mongoose.connection.close()
console.log('Close the connection in mongoDB');
