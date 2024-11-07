import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RegionsSchema = new Schema(
    {
        zipcode: {
            type: Number,
            require: true,
            unique: true,
        },
        clinics: {
            type: [Schema.Types.Mixed],
            require: true,
        },
    },
    {timestamps: true},
);

const Regions = mongoose.model('googleregions', RegionsSchema);
export default Regions;
