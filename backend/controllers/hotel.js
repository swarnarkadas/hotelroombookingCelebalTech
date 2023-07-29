const { response } = require("express");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

//Create
const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//update
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //we have to use 'new:true' because  without it 'findByIdAndUpdate' method update data in Database but doesn't send the updated data in 'res.json'
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//delete
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

//get
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//getAll
 const getHotels = async (req,res,next)=>{

  const {min,max, ...other} = req.query;
  try {
      const hotels =await Hotel.find({...other, cheapestPrice: { $gt: min | 10, $lt: max || 999999 }});
      if(!hotels){
          return res.status(404).json({message : "No hotel found"});
      }
      else{
          return res.status(200).json(hotels);
      }
  } catch (error) {
      return console.log(error);            
  }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); //split all the cities by comma and make a cities array
  try {
    const list = await Promise.all(
      cities.map((city) => {
        //we use 'promise.all' as we're gonna find multiple    items as we have 3 cities in the query
        //By using Promise.all with await, you achieve concurrent execution of independent asynchronous tasks, leading to better performance and reduced overall waiting time
        return Hotel.countDocuments({ city: city }); //: This line performs a database query using the Mongoose   model Hotel to find the count of documents (hotels) that match the provided city field.
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const motelCount = await Hotel.countDocuments({ type: "motel" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const suitsCount = await Hotel.countDocuments({ type: "suits" });
    const guesthouseCount = await Hotel.countDocuments({ type: "guest house" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "motel", count: motelCount },
      { type: "resort", count: resortCount },
      { type: "suits", count: suitsCount },
      { type: "guest house", count: guesthouseCount },
    ]);
  } catch (err) {
    next(err);
  }
};


const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
};

