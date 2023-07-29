const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");

//Create
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        // for this we import 'Hotel' model
        $push: { rooms: savedRoom._id }, // we push this newly created 'room' in the 'rooms' array of hotel model
      });
    } catch {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch {
    next(err);
  }
};

//update
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //we have to use 'new:true' because  without it 'findByIdAndUpdate' method update data in Database but doesn't send the updated data in 'res.json'
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};



const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

//delete
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, //as after deleting the room we also have to delete this  room from the 'rooms' array of hotel model
      });
    } catch {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

//get
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//getAll
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
};
