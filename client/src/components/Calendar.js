import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./calendar.css";

Date.prototype.getISOWeek = function () {
	const date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	const yearStart = new Date(date.getFullYear(), 0, 1);
	return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

const Calendar = () => {
	const [sessionData, setSessionData] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [filteredSessionData, setFilteredSessionData] = useState([]);
    const [unfilteredSessionData, setUnfilteredSessionData] = useState([]);
	const [filteredSessionPosition, setFilteredSessionPosition] = useState(-1);

	const fetchSessions = async () => {
		try {
			const response = await fetch("api/fetch-calendar-data");
			const data = await response.json();
			console.log(data);
			setSessionData(data);
			setUnfilteredSessionData(data);
const currentWeekNumber = new Date().getISOWeek();

// Filter the session data for the current week
const filteredData = data.filter(
	(session) => new Date(session.session_date).getISOWeek() === currentWeekNumber
);


console.log(filteredData);
					setSessionData(filteredData);
					setFilteredSessionData(filteredData);
					const startingWeek =
							filteredData.length > 0 ? filteredData[0].weeknumber : null;

						// Find the position of the starting week within the unfiltered data
						const startingSession = data.find(
							(session) => session.weeknumber === startingWeek
						);
						if (startingSession) {
							const startingSessionPosition = data.indexOf(startingSession);
							setFilteredSessionPosition(startingSessionPosition);
							setCurrentIndex(startingSessionPosition);
						}
		} catch (error) {
			console.error("Error fetching session data:", error);
		}
	};

	useEffect(() => {
		fetchSessions();
	}, []); // Fetch session data when component mounts
	// Handle Syllabus Button Click
	const handleSyllabusButtonClick = () => {
		// Redirect to the Syllabus link
		// (window.location.href = "https://syllabus.codeyourfuture.io/Overview"),
		// 	"_blank",
		// 	"noopener,noreferrer";
		const agendaLink = "https://syllabus.codeyourfuture.io/Overview";
		const newTab = window.open();
		newTab.opener = null;
		newTab.location = agendaLink;
	};
	// Handle Agenda Button Click
	const handleAgendaButtonClick = () => {
		// Redirect to the Agenda link
		// (window.location.href =
			const agendaLink =
      "https://docs.google.com/spreadsheets/d/10TPHM4i0KTRt99AumwzFmzDGm8uCJKrEPnx-IsvYMfM/edit?pli=1#gid=0";
    const newTab = window.open();
    newTab.opener = null;
    newTab.location = agendaLink;
	};

const goToPreviousSession = () => {
	if (currentIndex > 0) {
		console.log("Current Index (Previous):", currentIndex - 1);
		setCurrentIndex(currentIndex - 1);
	}
};

const goToNextSession = () => {
	if (currentIndex < unfilteredSessionData.length - 1) {
		console.log("Going to next session:", currentIndex + 1);
		setCurrentIndex(currentIndex + 1);
	}
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
						<Link className="link" to="/attendance">
							ATTENDANCE
						</Link>
					</li>
					<li className="navListItem">
						<Link className="link" to="/travel">
							TRAVEL CHECK
						</Link>
					</li>
				</ul>
				<img className="logo-img" src={Logo} alt="logo" />
			</div>
			<h1>CYF Classroom Plan</h1>
			<div className="main">
				<div className="left">
					<div className="leftContent">
						<div className="leftItem">
							<div className="leftItem">{`Week ${
								unfilteredSessionData[currentIndex]?.weeknumber || ""
							}`}</div>
							<div className="leftItem">
								{unfilteredSessionData[currentIndex]?.name || ""}
							</div>
							<div className="leftItem">
								{new Date(
									unfilteredSessionData[currentIndex]?.session_date
								).toLocaleDateString()}
							</div>
							<div className="leftItem">10:00-17:00</div>
						</div>
						<button className="previousButton" onClick={goToPreviousSession}>
							Previous
						</button>
						<button className="nextButton" onClick={goToNextSession}>
							Next
						</button>
					</div>
				</div>
				<div className="right">
					<div className="rightContent">
						<button className="agendaButton" onClick={handleAgendaButtonClick}>
							Agenda
						</button>
						<button
							className="syllabusButton"
							onClick={handleSyllabusButtonClick}
						>
							syllabus
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;