import { useState, useRef } from "react";
import "./App.css";
import Modal from "./component/Modal";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function App() {
	const [check, SetCheck] = useState("");
	const [checkOut, SetCheckOut] = useState("");
	const [Type, SetType] = useState("");
	const [Hotel, SetHotel] = useState("");
	const [Room, SetRoom] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [UserAllHotelData, SetUserAllHotelData] = useState({});
	const [BoookedStatus, setBookedStatus] = useState("");
	let Booked = false;
	const [searchAvailableRoom, SetsearchAvailableRoom] = useState([]);
	const [search, Setsearch] = useState("");

	function printAll(e) {
		e.preventDefault();
		var modal = document.querySelector(".modal");
		modal.style.display = "block";
	}

	function closemodal() {
		var modal = document.querySelector(".modal");
		modal.style.display = "none";
	}

	function searchNow(e) {
		Setsearch(e.target.value.toUpperCase());

		if (e.target.value.length === 0 && searchAvailableRoom.length > 1) {
			SetsearchAvailableRoom([]);
		} else {
			fetch(`http://localhost:5000/room/${search}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.length === 0) {
						SetsearchAvailableRoom([]);
					} else {
						SetsearchAvailableRoom(data.availableRoom);
					}
				});
		}
	}

	function submitUserData(e) {
		e.preventDefault();
		const alldataofUser = {
			checkIn: check,
			checkOut: checkOut,
			TypeData: Type,
			HotelRoom: Hotel,
			RoomNo: Room,
			NameOfUser: name,
			EmailofUser: email,
			PhoneOfUser: phoneNumber,
		};
		SetUserAllHotelData(alldataofUser);
		console.log(alldataofUser);

		// sending data
		fetch("http://localhost:5000/bookhotel", {
			method: "POST",
			body: JSON.stringify(UserAllHotelData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				Booked = true;
				setBookedStatus(data.message);
				console.log(BoookedStatus);
			})
			.catch((error) => {
				console.log(error);
				Booked = false;
			});

		var modal = document.querySelector(".modal");
		modal.style.display = "none";
	}

	return (
		<>
			<div className="show_available"></div>
			<form onSubmit={printAll} className="parent_container">
				<label htmlFor="">checkin Date</label>
				<input
					type="date"
					value={check}
					onChange={(e) => SetCheck(e.target.value)}
				/>
				<br />
				<label htmlFor="">checkout Date</label>
				<input
					type="date"
					value={checkOut}
					onChange={(e) => SetCheckOut(e.target.value)}
				/>
				<br />
				<label htmlFor="">Type</label>
				<select
					value={Type}
					onChange={(e) => SetType(e.target.value)}
					placeholder="Select category"
				>
					<option value="1 BHK">1 BHK</option>
					<option value="2 BHK">2 BHK</option>
					<option value="3 BHK">3 BHK</option>
				</select>
				<br />
				<label htmlFor="">Hotels</label>
				<select
					value={Hotel}
					onChange={(e) => SetHotel(e.target.value)}
				>
					<option value="H1">H1</option>
					<option value="H2">H2</option>
				</select>
				<input
					type="text"
					value={search}
					className="search_inp"
					onChange={searchNow}
					onBlur={() => SetsearchAvailableRoom([])}
					placeholder="search for available rooms"
				/>
				<div className="data">
					{searchAvailableRoom
						? searchAvailableRoom.map((e) => {
								return (
									<div className="data_div" key={e.id}>
										<p>Hotel -> : {e.Hotels}</p>
										<p>Room -> : {e.Rooms}</p>
										<p>Type -> : {e.Type}</p>
									</div>
								);
						  })
						: null}
				</div>
				<label htmlFor="">Room</label>
				<select value={Room} onChange={(e) => SetRoom(e.target.value)}>
					<option value="R1">R1</option>
					<option value="R2">R2</option>
					<option value="R3">R3</option>
				</select>

				<button type="submit">Book Now</button>
				<p color="green">{BoookedStatus}</p>

			</form>


			{/* modal  */}
			<div id="myModal" class="modal">
				<div class="modal-content">
					<span class="close" onClick={closemodal}>
						&times;
					</span>
					<h2>Fill this Details</h2>
					<form onSubmit={submitUserData}>
						<label htmlFor="">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<label htmlFor="">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<label htmlFor="">phone</label>
						<input
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<br />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>



		</>
	);
}

export default App;
