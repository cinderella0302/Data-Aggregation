import mongoose from "mongoose";
import dotenv from 'dotenv';
import axios from 'axios';
import TotalClinics from './models/clinics.model.js';
import ADAClinics from './models-ada/clinics.model.js';
import AAOClinics from './models-aao/clinics.model.js';

dotenv.config();
const mongooseURL = process.env.MONGODB_URL;
const APIKEY = process.env.GOOGLE_MAPS_API_KEY;

await mongoose.connect(mongooseURL);
console.log('Connected to mongodb');

console.log('----- start at first');
const cursor = await AAOClinics.find().cursor();

let flag = false;
// console.log('----- start', cursor);
try{
    for(let doc = await cursor.next(); doc != null; doc = await cursor.next()){

        const website = doc.Website;
        // 17555, 21524
        if(website == 'www.welchdentalgroup.com'){
            flag = true;
        }
        console.log('------ start clinic: ', website);
        if(flag){
            const existed = await TotalClinics.findOne(
                {website: website}
            );
            console.log('---- existed: ', existed);

            if(existed){
                await TotalClinics.findOneAndUpdate(
                    { website: website},
                    {
                        $set: {
                            source: 4,
                        }
                    },
                    { upsert: true }
                );
                console.log('---- update clinic: ', website);

            }else{
                const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${website}&key=${APIKEY}`);
                // console.log('---- response: ', response.data);

                if(response.status == "ZERO_RESULTS"){
                    console.log('------- not existing clinic: ', website);
                    await TotalClinics.create(
                        {
                            source: 2,
                            website: website,
                        }
                    );
                }else{
                    const clinic = response.data.results[0];
                    const clinicResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${clinic.place_id}&key=${APIKEY}`);
                    const clinicInfo = clinicResponse.data.result;
                    // console.log(clinicInfo);
                    try{
                        await TotalClinics.create(
                            {
                                source: 4,
                                ...clinicInfo,
                            }
                        );
                        console.log('---- create a new clinic: ', website);
                    }catch(error){
                        console.log('---- already existed clinic: ', website)
                    }
                }
            }
            // console.log('---- push dentist: ', addressId);
        }else{
            // break;
            console.log('---- bypass dentist: ', website);
            // await mongoose.connection.close();
        }
    }
}catch(error){
    console.log('---- storeadadentist Error: ', error);
}

console.log('------------------ finish ');
await mongoose.connection.close();
console.log('Close the connection in mongoDB');
