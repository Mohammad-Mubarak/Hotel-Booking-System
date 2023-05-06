const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  email: {
    type: String,
  
  },
  mobile: {
    type: String,
   
  },
  checkin_date: {
    type: String,
   
  },
  checkout_date: {
    type: String,
   
  },
  room_code: {
    type: String,
   
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking

