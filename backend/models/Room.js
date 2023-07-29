const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    title:{                               //Ex:- Big rooms with 2 beds
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    maxPeople:{            //Max people that can stay in a room             
        type: Number,
        required:true
    },
    roomNumbers: [{number:Number , unavailableDates: {type: [Date]}}],                //its an array of 'Room Numbers' which has same title, same price, same maxPeople
                                                                          //and when somebody book specific room no. in a specific dates, we are gonna add 'unavilable dates' so that nobody can resolve this date, which is a array again

},{timestamps:true});     //basically its gonna give 'createdAt' and 'updatedAt' time

const Room = mongoose.model("Room",RoomSchema);
module.exports = Room;