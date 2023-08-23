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

//London Lines
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


//all states for this page
const TravelCheck = () => {
	const [showNationalRailStrike, setShowNationalRailStrike] = useState(false);
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
	const [showDisruptionsAndLines, setShowDisruptionsAndLines] = useState(false);


	//nationalRail Data
	const nationalRailStrikeData = [
		{
			date: "Saturday 19 August",
			details: [
				"between Birmingham New Street and Bristol Temple Meads / Plymouth",
				"between Birmingham New Street and Cardiff Central",
				"between Birmingham New Street and Nottingham",
			],
		},
		{
			date: "Saturday 26 August",
			details: [
				"For journeys on Saturday 26 August, you can check your journey on Monday 21 August.",
			],
		},
		{
			date: "Saturday 2 September",
			details: [
				"For journeys on Saturday 2 September, you can check your journey on Monday 28 August.",
			],
		},
		{
			date: "Saturday 9 September",
			details: [
				"For journeys on Saturday 9 September, you can check your journey on Monday 4 September.",
			],
		},
	];


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


   //by Date
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

        //handel clicked of this age
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
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link"
							>
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</footer>
		);
	};

	return (
		<div id="page-container">
			<div id="travel">
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

					{/* National Rail Strike */}
					<button
						onClick={() => setShowNationalRailStrike(!showNationalRailStrike)}
					>
						Toggle National Rail Strike
					</button>
					{showNationalRailStrike && (
						<div className="national-rail-strike-container">
							<h2>National Rail Strike</h2>
							<ul className="national-rail-strike-list">
								{nationalRailStrikeData.map((strike, index) => (
									<li key={index} className="strike-item">
										<strong>{strike.date}</strong>
										<ul>
											{strike.details.map((detail, detailIndex) => (
												<li key={detailIndex}>{detail}</li>
											))}
										</ul>
										<br />
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Toggle Disruptions and Lines */}
					<button
						onClick={() => setShowDisruptionsAndLines(!showDisruptionsAndLines)}
					>
						Toggle Disruptions and Lines
					</button>

					{showDisruptionsAndLines && (
						<div>
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
							<h1>Lines</h1>
							<ul className="londonLine">
								{lineStatuses.map((status, index) => (
									<li key={index}>
										Line: {status.name}
										Status:{" "}
										{status.lineStatuses[0]?.statusSeverityDescription ||
											"Unknown"}
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
												<li key={status.id}>
													{status.statusSeverityDescription}
												</li>
											))}
										</ul>
									) : (
										<p>No data available for the selected date.</p>
									)}
								</div>
							</>
						) : (
							<button onClick={toggleForm}>Show Line Status By Date</button>
						)}
					</div>
				</>
				<UsefulLinksFooter />
			</div>
		</div>
	);
};

export default TravelCheck;





