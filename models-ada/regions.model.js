import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RegionsSchema = new Schema(
    {
        zipcode: {
            type: Number,
            require: true,
            unique: true,
        },
        dentists: {
            type: [Schema.Types.Mixed],
            require: true,
        },
    },
    {timestamps: true},
);

const Regions = mongoose.model('adaregions', RegionsSchema);
export default Regions;
