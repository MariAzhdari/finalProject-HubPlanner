// import React, { useState , useEffect } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./img/cyfLogo1.png";
// import "./travelCheck.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

// const TravelCheck = () => {
//  const [disruptions, setDisruptions] = useState([]);
//  const [selectedDate, setSelectedDate] = useState(new Date());

// const fetchDisruptions = async () => {
// 	const formattedDate = selectedDate.toISOString().split("T")[0];

// 	try {
// 		const response = await axios.get(
// 			`http://localhost:3100/api/disruptions/${formattedDate}`
// 		);
// 		setDisruptions(response.data);
// 	} catch (error) {
// 		console.error("Error fetching disruptions:", error);
// 	}
// };

//  useEffect(() => {
// 		const fetchDisruptions = async () => {
// 			try {
// 				const response = await axios.get(
// 					"https://api.digital.tfl.gov.uk/Line/Mode/GET%20/Line/Mode/tube%2Cdlr/Disruption/Disruption"
// 				);
// 				setDisruptions(response.data);
// 			} catch (error) {
// 				console.error("Error fetching disruptions:", error);
// 			}
// 		};

// 		fetchDisruptions();
//  }, [selectedDate]);

//     return (
// 			<div>
// 				<div className="navbar">
// 					<ul className="navList">
// 						<li className="navListItem">
// 							<Link className="link" to="/main">
// 								MAIN
// 							</Link>
// 						</li>
// 						<li className="navListItem">
// 							<Link className="link" to="/calendar">
// 								CYF CALENDAR
// 							</Link>
// 						</li>
// 						<li className="navListItem">
// 							<Link className="link" to="/travel">
// 								TRAVEL CHECK
// 							</Link>
// 						</li>
// 						<li className="navListItem">
// 							<Link className="link" to="/attendance">
// 								ATTENDANCE
// 							</Link>
// 						</li>
// 					</ul>
// 					<img className="logo-img" src={Logo} alt="logo" />
// 				</div>

// 				<div className="Right">
// 					<div>
// 						<DatePicker
// 							selected={selectedDate}
// 							onChange={(date) => setSelectedDate(date)}
// 							className="Datebutton"
// 						/>
// 					</div>
// 					<div>
// 						<button className="Travelbutton" onClick={fetchDisruptions}>
// 							Check Travel Disruption
// 						</button>
// 					</div>
// 				</div>

// 				<div className="list-container">
// 					<div className="list">
// 						<ul>
// 							{disruptions.map((disruption, index) => (
// 								<li key={index}>{disruption.description}</li>
// 							))}
// 						</ul>
// 					</div>
// 				</div>
// 			</div>
// 		);
// };

// export default TravelCheck;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./img/cyfLogo1.png";
// import "./travelCheck.css";
// import axios from "axios";

// const TravelCheck = () => {
// 	const [disruptions, setDisruptions] = useState([]);

// 	const fetchUpcomingDisruptions = async () => {
// 		try {
// 			const response = await axios.get(
// 				"https://api.digital.tfl.gov.uk/Line/Mode/GET%20/Line/Mode/tube%2Cdlr/Disruption/Disruption"
// 			);


// 			// Assuming each disruption has a 'startTime' field in the format 'YYYY-MM-DDTHH:MM:SS'
// 			// Adjust this based on actual API structure
// 			const now = new Date();
// 			const upcoming = response.data.filter((disruption) => {
// 				const disruptionTime = new Date(disruption.startTime);
// 				return disruptionTime > now;
// 			});

// 			setDisruptions(upcoming);
// 		} catch (error) {
// 			console.error("Error fetching disruptions:", error);
// 		}

// 	};

// 	return (
// 		<div>
// 			<div className="navbar">
// 				<ul className="navList">
// 					<li className="navListItem">
// 						<Link className="link" to="/main">
// 							MAIN
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/calendar">
// 							CYF CALENDAR
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/travel">
// 							TRAVEL CHECK
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/attendance">
// 							ATTENDANCE
// 						</Link>
// 					</li>
// 				</ul>
// 				<img className="logo-img" src={Logo} alt="logo" />
// 			</div>

// 			<div className="Right">
// 				<div>
// 					<button className="Travelbutton" onClick={fetchUpcomingDisruptions}>
// 						Check Upcoming Disruptions
// 					</button>
// 				</div>
// 			</div>

// 			{/* Displaying Upcoming Disruptions */}
// 			<div className="list-container">
// 				<div className="list">
// 					<ul>
// 						{disruptions.map((disruption, index) => (
// 							<li key={index}>{disruption.description}</li>
// 						))}
// 					</ul>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default TravelCheck;


//******************************************************** */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./travelCheck.css";
import Axios from "axios";

const TravelCheck=()=>{
	const [disruptions, setDisruptions] = useState("");

	const getDisruption = () => {
		Axios.get("https://api.tfl.gov.uk/Line/Meta/ServiceTypes").then(
			(response) => {
				console.log(response);
				setDisruptions(response.data.setup + "..." + response.data);
			}
		);
	};

		return (
			<div>
				<div className="navbar">
					<ul className="navList">
						<li className="navListItem">
							<Link className="link" to="/main">
								MAIN
							</Link>
						</li>
						<li className="navListItem">
							<Link className="link" to="/calendar">
								CYF CALENDAR
							</Link>
						</li>
						<li className="navListItem">
							<Link className="link" to="/travel">
								TRAVEL CHECK
							</Link>
						</li>
						<li className="navListItem">
							<Link className="link" to="/attendance">
								ATTENDANCE
							</Link>
						</li>
					</ul>
					<img className="logo-img" src={Logo} alt="logo" />
				</div>

				<div className="Right">
					<div>
						<button className="Travelbutton" onClick={getDisruption}>
							Check Upcoming Disruptions
						</button>
					</div>
				</div>

				<div className="list-container">
					<div className="list">
						<ul>
							{disruptions}
						</ul>
					</div>
				</div>
			</div>
		);
};
export default TravelCheck;

