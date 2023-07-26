import React from "react";
import Logo from "./img/CYF-logo2.png";
import "./main.css";

const Main = () => {
	return (
		<div>
			<div className="navbar">
				<ul className="navList">
					<li className="navListItem">CYF CALENDAR</li>
					<li className="navListItem">ATTENDANCE</li>
					<li className="navListItem">TRAVEL CHECK</li>
					<li className="navListItem">ABOUT US</li>
				</ul>

				<div className="container">
					<div className="up">
						<h1>Hub Planner</h1>
						<p>"Your Attendance, Your Journey, One Click Away!"</p>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Main;
