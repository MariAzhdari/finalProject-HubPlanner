import React from "react";
import Logo from "./img/cyfLogo1.png";
import "./calendar.css";

const Calendar = () => {
	return (
		<div>
			<div className="navbar">
				<ul className="navList">
					<li className="navListItem">CYF CALENDAR</li>
					<li className="navListItem">ATTENDANCE</li>
					<li className="navListItem">TRAVEL CHECK</li>
					<li className="navListItem">ABOUT US</li>
				</ul>
				<img className="logo-img" src={Logo} alt="logo" />
			</div>
			<h1>CYF Classroom Plan</h1>

		</div>
	);
};

export default Calendar;
