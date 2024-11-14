import mongoose from "mongoose";
import dotenv from 'dotenv';
import axios from 'axios';
import TotalClinics from './models/clinics.model.js';
import ADADentists from './models-ada/dentists.model.js';
import AAOClinics from './models-aao/clinics.model.js';

dotenv.config();
const mongooseURL = process.env.MONGODB_URL;

await mongoose.connect(mongooseURL);
console.log('Connected to mongodb');

const cursor = await TotalClinics.find({
    $or: [
        { source: [2] }
    ]
}).cursor();

console.log('----------- start --------------');
let flag = false;

for(let doc = await cursor.next(); doc != null; doc = await cursor.next()){

    const website = doc.website;
    if(website == "www.lwssfamilydentistry.com"){
        flag = true;
    }

    if(flag){
        console.log('----- start website: ', website, doc.place_id);

        const adadentist = await ADADentists.findOne(
            { WebSite: website}
        );
        // console.log('----- data: ', adadentist);

        if(adadentist){
            // console.log('----- data: ', adadentist.Insurances);

            try{
                await TotalClinics.findOneAndUpdate(
                    { website: website},
                    {
                        $set: {
                            payment_options: adadentist.PaymentOptions,
                            insurances: adadentist.Insurances,
                        }
                    }
                );
                console.log('----- update website: ', website);
            }catch(error){
                console.log('----- error website: ', website, error.message);
            }
            // flag = false;
        }else{
            console.log('----- dentist for that clinic doesnt exist: ', website);
        }
    }
}

console.log(" ------------------- finish ------------- ");
await mongoose.connection.close();
console.log(" ------------------- Closed mongodb connection --");

