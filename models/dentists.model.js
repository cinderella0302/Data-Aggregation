import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DentistsSchema = new Schema(
    {   
        email: String,
        PersonId: Number,
        AddressId: Number,
        Photo: String,
        Specialty: Schema.Types.Mixed,
        Specialities: [Schema.Types.Mixed],
        Name: String,
        TagName: String,
        Phone: {
            type: String,
            unique: true,
        },
        WebSite: String,
        HasEmail: Boolean,
        Address: String,
        City: String,
        State: String,
        County: String,
        Zip: String,
        AddressLine1: String,
        AddressLine2: String,
        PaymentOptions: [String],
        Insurances: [String],
        Gender: String,
        PatientTypes: [ String ],
        PracticeFocus: [ String ],
        Languages: [ String ],
        PracticeDescription: String,
        ADALogo: String,
        ConstituentName: String,
        ConstituentLogo: String,
        ComponentName: String,
        ComponentLogo: String,
        ConstituentUrl: String,
        ComponentUrl: String,
        Latitude: Number,
        Longitude: Number,
        BusinessHours: [ Schema.Types.Mixed],
        Education: [ Schema.Types.Mixed ],
        MetaDescription: String,
        Email: String,
        Source: String,
    },
    {timestamps: true},
);

const TotalDentists = mongoose.model('totaldentists', DentistsSchema);
export default TotalDentists;

// Source
// 1: ada
// 2: aao 
// 3: both
