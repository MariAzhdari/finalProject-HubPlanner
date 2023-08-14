import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./travelCheck.css";
import axios from "axios";

const TravelCheck = () => {
	// const [modes, setModes] = useState([]);
	const [lineStatuses, setLineStatuses] = useState([]);
	const [disruptions, setDisruptions] = useState([]);
	const [showLineStatuses, setShowLineStatuses] = useState(false);
	const [showDisruptions, setShowDisruptions] = useState(false);

	// const fetchModes = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			"https://api.tfl.gov.uk/Line/Meta/Modes"
	// 		);
	// 		setModes(response.data);
	// 	} catch (error) {
	// 		console.error("Error fetching modes:", error);
	// 	}
	// };

	const fetchLineStatus = async () => {
		const selectedModes = "tube,dlr";
		const url = `https://api.tfl.gov.uk/Line/Mode/${selectedModes}/Status`;
		try {
			const response = await axios.get(url);
			setLineStatuses(response.data);
		} catch (error) {
			console.error("Error fetching line statuses:", error);
		}
	};
	const fetchDisruptions = async () => {
		const selectedModes = "tube,dlr";
		const url = `https://api.tfl.gov.uk/Line/Mode/${selectedModes}/Disruption`;
		try {
			const response = await axios.get(url);
			setDisruptions(response.data);
		} catch (error) {
			console.error("Error fetching disruptions:", error);
		}
	};
	return (
		<>
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

			{/* <button onClick={fetchModes}>Fetch Modes</button>
			<div className="modes-container">
				<ul>
					{modes.map((mode, index) => (
						<li key={index}>
							Mode Name: {mode.modeName} | Is TFL Service:
							{mode.isTflService ? "Yes" : "No"} | Is Fare Paying:
							{mode.isFarePaying ? "Yes" : "No"} | Is Scheduled Service:
							{mode.isScheduledService ? "Yes" : "No"}
						</li>
					))}
				</ul>
			</div> */}

			<button
				onClick={() => {
					fetchDisruptions();
					setShowDisruptions(!showDisruptions);
				}}
			>
				Toggle Disruptions
			</button>
			{showDisruptions && (
				<div className="disruptions-container">
					<h2>Disruptions</h2>
					<ul className="disruption-list">
						{disruptions.map((disruption, index) => (
							<li key={index} className="disruption-item">
								{disruption.description}
								<br />
							</li>
						))}
					</ul>
				</div>
			)}

			<button
				onClick={() => {
					fetchLineStatus();
					setShowLineStatuses(!showLineStatuses);
				}}
			>
				London Lines
			</button>
			{showLineStatuses && (
				<div>
					<h1>Lines</h1>
					<ul>
						{lineStatuses.map((status, index) => (
							<li key={index}>
								Line: {status.name}
								{/* Status: {status.statusDescription} */}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default TravelCheck;





