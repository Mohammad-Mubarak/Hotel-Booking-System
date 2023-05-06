require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const Booking = require("./model/booking");
const HotelRoomId = require("./model/Hotels");

// data base connection
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const connect = require("./config/connection");
connect(user, pass);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/bookhotel", async (req, res) => {
	const {
		checkIn,
		checkOut,
		TypeData,
		HotelRoom,
		RoomNo,
		NameOfUser,
		EmailofUser,
		PhoneOfUser,
	} = req.body;

	var room = HotelRoom + RoomNo;

	const data = {
		name: NameOfUser,
		email: EmailofUser,
		mobile: PhoneOfUser,
		checkin_date: checkIn,
		checkout_date: checkOut,
		room_code: room,
	};

	console.log("🧜‍♂️🦴 ~> file: app.js:49 ~> app.post ~> data:  :-> >", data)


	try {

		/// storing in Dabase 
		const booked = new Booking(data);
		const userBooked = await booked.save();

		// finding room by name if available
		const dataReceived = await HotelRoomId.findOne({Rooms:room});
		if (dataReceived) {
			// Updating status of room 
		  await HotelRoomId.findByIdAndUpdate(dataReceived._id, { Booked: true });
		} else {
		  console.log(`No hotel room found with room code ${room}.`);
		}
		res.status(201).json({
			message: "Booking created successfully",
			data: userBooked,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to create booking" });
	}
});


// searching Rooms which is not booked
app.get("/room/:room", async (req, res) => {
	console.log(req.params.room)
	const data = await HotelRoomId.find({
		$or: [
		  { Rooms: { $regex: `^${req.params.room}` } },
		  { Type: { $regex: `^${req.params.room}` } },
		],
	  });
	
  
	const availableRoom = [];
	data.map((e) => {
		if (e.Booked == false) {
			availableRoom.push(e);
		}
	});

	res.json({
		availableRoom
	});
});



// for getting available rooms
app.get("/available", async (req, res) => {
	const data = await HotelRoomId.find({});
	const availableRoom = [];

	data.map((e) => {
		if (e.Booked == false) {
			availableRoom.push(e);
		}
	});

	res.json({
		availableRoom: availableRoom,
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
