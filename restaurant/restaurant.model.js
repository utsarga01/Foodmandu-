import mongoose from"mongoose";


//set schema
const restaurantSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,//khali huna vayena
        maxLength:55,
        trim:true,
    },
    location:{
        type:String,
        required:true,
        trim:true,
        maxLength:55,
    },
    contact:{
        type:String,
        required:true,
        trim:true,
        maxLength:15,
        minLength:10,
    },
    ownerName:{
        type:String,
        required:false,
        nullable:true,
        default:null,
    },
});

//create collection
const Restaurant = mongoose.model("Restaurant",restaurantSchema);

export default Restaurant;