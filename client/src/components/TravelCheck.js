// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./img/cyfLogo1.png";
// import "./travelCheck.css";
// import axios from "axios";

// const TravelCheck = () => {
// 	// const [modes, setModes] = useState([]);
// 	const [lineStatuses, setLineStatuses] = useState([]);
// 	const [disruptions, setDisruptions] = useState([]);
// 	const [showLineStatuses, setShowLineStatuses] = useState(false);
// 	const [showDisruptions, setShowDisruptions] = useState(false);

// 	const fetchDisruptions = async () => {
// 		const selectedModes = "tube,dlr";
// 		const url = `https://api.tfl.gov.uk/Line/Mode/${selectedModes}/Disruption`;
// 		try {
// 			const response = await axios.get(url);
// 			setDisruptions(response.data);
// 		} catch (error) {
// 			console.error("Error fetching disruptions:", error);
// 		}
// 	};


// 	const fetchLineStatus = async () => {
// 		const selectedModes = "tube";
// 		const url = `https://api.tfl.gov.uk/Line/Mode/${selectedModes}/Status`;
// 		try {
// 			const response = await axios.get(url);
// 			setLineStatuses(response.data);
// 		} catch (error) {
// 			console.error("Error fetching line statuses:", error);
// 		}
// 	};

// 	return (
// 		<>
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

		

// 			<button
// 				onClick={() => {
// 					fetchDisruptions();
// 					setShowDisruptions(!showDisruptions);
// 				}}
// 			>
// 				Toggle Disruptions
// 			</button>
// 			{showDisruptions && (
// 				<div className="disruptions-container">
// 					<h2>Disruptions</h2>
// 					<ul className="disruption-list">
// 						{disruptions.map((disruption, index) => (
// 							<li key={index} className="disruption-item">
// 								{disruption.description}
// 								<br />
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}

// 			<button
// 				onClick={() => {
// 					fetchLineStatus();
// 					setShowLineStatuses(!showLineStatuses);
// 				}}
// 			>
// 				London Lines
// 			</button>
// 			{showLineStatuses && (
// 				<div>
// 					<h1>Lines</h1>
// 					<ul>
// 						{lineStatuses.map((status, index) => (
// 							<li key={index}>
// 								Line: {status.name}
// 								Status:{" "}
// 								{status.lineStatuses[0]?.statusSeverityDescription || "Unknown"}
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default TravelCheck;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./travelCheck.css";
import axios from "axios";

const LineOptions = [
	"Central",
	"Circle",
	"District",
	"Jubilee",
	"Metropolitan",
	"Northern",
	"Piccadilly",
	"Victoria",
	"Waterloo & City",
];

const TravelCheck = () => {
	const [lineStatuses, setLineStatuses] = useState([]);
	const [disruptions, setDisruptions] = useState([]);
	const [showLineStatuses, setShowLineStatuses] = useState(false);
	const [showDisruptions, setShowDisruptions] = useState(false);
	const [selectedLine, setSelectedLine] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [lineData, setLineData] = useState([]);
	const [showStatusForm, setShowStatusForm] = useState(false);

	//at the moment Disruption
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
	//all lines
	const fetchLineStatus = async () => {
		const selectedModes = "tube";
		const url = `https://api.tfl.gov.uk/Line/Mode/${selectedModes}/Status`;
		try {
			const response = await axios.get(url);
			setLineStatuses(response.data);
		} catch (error) {
			console.error("Error fetching line statuses:", error);
		}
	};

	const fetchLineData = async () => {
		try {
			const response = await axios.get(
				`https://api.tfl.gov.uk/Line/${selectedLine}/Status/${selectedDate}T00:00:00.000Z/to/${selectedDate}T23:59:59.000Z`
			);
			console.log("Fetched data:", response.data);
			setLineData(response.data);
		} catch (error) {
			console.error("Error fetching line data:", error);
		}
	};

	useEffect(() => {
		fetchDisruptions();
		fetchLineStatus();
		fetchLineData();
	}, [selectedLine, selectedDate]);

	const handleLineChange = (event) => {
		setSelectedLine(event.target.value);
	};

	const handleDateChange = (event) => {
		setSelectedDate(event.target.value);
	};

	const toggleForm = () => {
		setShowStatusForm(!showStatusForm);
		setLineData([]); // Clear line data when toggling the form
	};


	//footer

	const UsefulLinksFooter = () => {
		const usefulLinks = [
			{
				name: "Plan Your Journey",
				url: "https://tfl.gov.uk/plan-a-journey/",
			},
			{
				name: "The Trainline",
				url: "https://www.thetrainline.com/",
			},
			{
				name: "National Rail Industrial Action",
				url: "https://www.nationalrail.co.uk/travel-information/industrial-action/",
			},
			{
				name: "Citymapper",
				url: "https://citymapper.com/london?lang=en",
			},
			{
				name: "Chiltern Railways",
				url: "https://www.chilternrailways.co.uk/?gad=1&gclid=CjwKCAjw5_GmBhBIEiwA5QSMxHn_XWe0uQMyoUbKrWux3oa-aqayN1gN2a4ob5Gt8QRhgD32pFmE1hoCfXQQAvD_BwE",
			},
		];
		return (
			<footer className="useful-links-footer">
				<h3>Useful Links for Your Journey</h3>
				<ul className="link-list">
					{usefulLinks.map((link, index) => (
						<li key={index}>
							<a href={link.url} target="_blank" rel="noopener noreferrer">
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</footer>
		);
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

			{/* Disruptions */}
			<button onClick={() => setShowDisruptions(!showDisruptions)}>
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

			{/* London Lines */}
			<button onClick={() => setShowLineStatuses(!showLineStatuses)}>
				Toggle London Lines
			</button>
			{showLineStatuses && (
				<div>
					<h1>Lines</h1>
					<ul>
						{lineStatuses.map((status, index) => (
							<li key={index}>
								Line: {status.name}
								Status:{" "}
								{status.lineStatuses[0]?.statusSeverityDescription || "Unknown"}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* London Underground Line Status */}
			<div className="status-form">
				{showStatusForm ? (
					<>
						<h1>London Underground Line Status</h1>
						<div className="options">
							<select value={selectedLine} onChange={handleLineChange}>
								{LineOptions.map((line) => (
									<option key={line} value={line}>
										{line}
									</option>
								))}
							</select>
							<input
								type="date"
								value={selectedDate}
								onChange={handleDateChange}
							/>
							<button onClick={toggleForm}>Close</button>
						</div>
						<div className="line-data">
							<h2>{selectedLine} Line Status</h2>
							{lineData.length > 0 ? (
								<ul>
									{lineData[0].lineStatuses.map((status) => (
										<li key={status.id}>{status.statusSeverityDescription}</li>
									))}
								</ul>
							) : (
								<p>No data available for the selected date.</p>
							)}
						</div>
					</>
				) : (
					<button onClick={toggleForm}>Show Line Status</button>
				)}
			</div>
			<UsefulLinksFooter />
		</>
	);
};

export default TravelCheck;





