const mongoose = require('mongoose');
const hotelRoomSchema = new mongoose.Schema({
  Hotels: {
    type: String,
    required: true
  },
  Rooms: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  Booked: {
    type: Boolean,
    required: true
  }
});

const HotelRoom = mongoose.model('hotels', hotelRoomSchema);

module.exports = HotelRoom;
