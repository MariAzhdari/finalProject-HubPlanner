import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./travelCheck.css";
import axios from "axios";

const TravelCheck = () => {
	const [modes, setModes] = useState([]);
	const [lineStatuses, setLineStatuses] = useState([]);
	const [disruptions, setDisruptions] = useState([]);

	const fetchModes = async () => {
		try {
			const response = await axios.get(
				"https://api.tfl.gov.uk/Line/Meta/Modes"
			);

			console.log(response);
			setModes(response.data);
		} catch (error) {
			console.error("Error fetching modes:", error);
		}
	};

	const fetchLineStatus = async () => {
		const modes = "tube,dlr"; //  adjust this as needed
		const detail = true; // Getting detailed disruptions
		const url = `https://api.tfl.gov.uk/Line/Mode/${modes}/Status?detail=${detail}`;
		try {
			const response = await axios.get(url);
			setLineStatuses(response.data);
		} catch (error) {
			console.error("Error fetching line statuses:", error);
		}
	};

	return (
		<>
			<div className="navbar">
				<ul className="navList">
					<li className="navListItem">
						{" "}
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
					</li>{" "}
					<li className="navListItem">
						<Link className="link" to="/attendance">
							ATTENDANCE
						</Link>{" "}
					</li>
				</ul>
				<img className="logo-img" src={Logo} alt="logo" />
			</div>

			<button onClick={fetchModes}>Fetch Modes</button>
			<div className="modes-container">
				<ul>
					{modes.map((mode, index) => (
						<li key={index}>
							Mode Name: {mode.modeName} | Is TFL Service: <br />
							{mode.isTflService ? "Yes" : "No"} | Is Fare Paying: <br />
							{mode.isFarePaying ? "Yes" : "No"} | Is Scheduled Service: <br />
							{mode.isScheduledService ? "Yes" : "No"}
							<br />
						</li>
					))}
				</ul>
			</div>

			<button onClick={fetchLineStatus}>Fetch Line Status</button>
			<div>
				<h1>Line Statuses</h1>
				<ul>
					{lineStatuses.map((status, index) => (
						<li key={index}>
							Line: {status.name} | Status:{" "}
							{status.statusDescription}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default TravelCheck;








