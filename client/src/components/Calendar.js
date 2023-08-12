import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "./img/cyfLogo1.png";
import "./calendar.css";

const Calendar = () => {
const [showSessionTable, setShowSessionTable] = useState(true);
  const [sessionData, setSessionData] = useState([]);
  const [isAgendaView, setIsAgendaView] = useState(false);

  const handleSyllabusClick = () => {
    setShowSessionTable(true);
    setIsAgendaView(false);
    fetchSessions();
  };

  const handleAgendaClick = () => {
    setShowSessionTable(true);
    setIsAgendaView(true);
    updateSessionTimesToCurrentTime();
  };

  const updateSessionTimesToCurrentTime = () => {
    // Update session times to the current time for Agenda view
    const updatedSessionData = sessionData.map((session) => ({
      ...session,
      session_date: new Date().toISOString(), // Update to current time
    }));
    setSessionData(updatedSessionData);
  };
//   const {session}=useParams();
// //   const []
// useEffect (()=> {
// 	const url = `server/calander/&{session}`;
// 	const fetchData = () => {
// 		fetch(url)
// 		.then((res)=>res.json())
// 		.then((data)=>	)
// 	}
// });
 const url = `/server/calendar/${session}`;
  const fetchSessions = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSessionData(data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
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
				{/* <div className="leftItem" id="week">
							Week 20
						</div>
						<div className="leftItem">React</div>
						<div className="leftItem">Saturday 23 July 2023</div>
						<div className="leftItem">10:00 - 17:00</div>  */}
						{showSessionTable && (
							<div className="leftItem">
								{sessionData.map((session) => (
									<div key={session.id} className="sessionDiv">
										<div className="leftItem">Session ID: {session.id}</div>
										<div className="leftItem">Session Name: {session.name}</div>
										{isAgendaView ? (
											<div className="leftItem">
												Session Date: {new Date().toLocaleString()}
											</div>
										) : (
											<div className="leftItem">Week: {session.WeekNumber}</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="right">
					<div className="rightContent">
						<button className="agendaButton" onClick={handleAgendaClick}>
							Agenda
						</button>
						<button className="syllabusButton" onClick={handleSyllabusClick}>
							Syllabus
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
