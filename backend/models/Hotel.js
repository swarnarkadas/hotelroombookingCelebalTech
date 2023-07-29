const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{                   //types of hotel: homestay,guesthouse etc.
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    distance:{
        type: String,
        required:true
    },
    photos:{
        type: [String],   // as we can have multiple images of a hotel.So,'photos' represents an array of strings in which each element of the array represents the URL or file path of an image.
    },
    title:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required:true
    },
    rating:{
        type: Number,    //ratings from  0-5
        min:0,
        max:5
    },
    rooms:{
        type: [String],     //array of room-ids
    },
    cheapestPrice:{
        type: Number,
        required:true
    },
    featured:{                   //basically in our React application we are gonna show some featured hotels
        type: Boolean,
        default:false      //The default: false part indicates that if a new document is created and no value is provided for the isFeatured field, its default value will be false
    },

});

const Hotel = mongoose.model("Hotel",HotelSchema);
module.exports = Hotel;