import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./calendar.css";

const Calendar = () => {
	const [sessionData, setSessionData] = useState([]);

	const fetchSessions = async () => {
		try {
			const response = await fetch("api/fetch-calendar-data");
			const data = await response.json();
			setSessionData(data);
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
		window.location.href = "https://syllabus.codeyourfuture.io/Overview";
	};
	// Handle Agenda Button Click
	const handleAgendaButtonClick = () => {
		// Redirect to the Agenda link
		window.location.href =
			"https://docs.google.com/spreadsheets/d/10TPHM4i0KTRt99AumwzFmzDGm8uCJKrEPnx-IsvYMfM/edit?pli=1#gid=0";
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
							<div className="leftItem">
								{sessionData.map((session) => (
									<div key={session.id} className="">
										<div className="weekNumber">{`Week ${session.weeknumber}`}</div>
										<div className="sessionName">{session.name}</div>
									</div>
								))}
							</div>
							<div className="leftItem">
								{sessionData.map((session) => (
									<div key={session.id} className="">
										{new Date(session.session_date).toLocaleDateString()}
										<div>10:00-5:00</div>
									</div>
								))}
							</div>
						</div>
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
							Syllabus
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;