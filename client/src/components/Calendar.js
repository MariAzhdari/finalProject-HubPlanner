import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./calendar.css";

const Calendar = () => {
	const [sessionData, setSessionData] = useState([]);
	const [showSyllabus, setShowSyllabus] = useState(false); // State to control displaying syllabus
	const [loading, setLoading] = useState(false);
	const [showAgenda, setShowAgenda] = useState(false);

	const fetchSessions = async () => {
		try {
			const response = await fetch("api/fetch-calendar-data");
			const data = await response.json();
			setSessionData(data);
			console.log(data);

		} catch (error) {
			console.error("Error fetching session data:", error);
		}
	};
	const handleSyllabusButtonClick = () => {
			setLoading(true);
			fetchSessions()
				.then(() => {
					setShowSyllabus(true);
					setShowAgenda(false);
				})
				.finally(() => {
					setLoading(false);
				});
		};
	const handleAgendaButtonClick = () => {
			setLoading(true);
			fetchSessions()
				.then(() => {
					setShowAgenda(true);
					setShowSyllabus(false);
				})
				.finally(() => {
					setLoading(false);
				});
		};
	useEffect(() => {
		fetchSessions();
	}, []); // Fetch session data when component mounts

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
						{loading ? (
							<p>Loading...</p>
						) : (
							<div>
								{showSyllabus && (
									<div>
										<h2>Syllabus</h2>
										{sessionData.map((session) => (
											<div key={session.id} className="sessionItem">
												<p className="weekNumber">{`Week ${session.weeknumber}`}</p>
												<p className="sessionName">{session.name}</p>
											</div>
										))}
									</div>
								)}

								{showAgenda && (
									<div>
										<h2>Agenda</h2>
										{sessionData.map((session) => (
											<div key={session.id} className="sessionItem">
												{new Date(session.session_date).toLocaleDateString()}
												<p>10:00-5:00</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}
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
