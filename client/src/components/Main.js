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
					<div className="down">
						<div className="downLeft">
							<i className="topIcon fab fa-facebook-square"></i>
							<i className="topIcon fab fa-instagram-square"></i>
							<i className="topIcon fab fa-pinterest-square"></i>
							<i className="topIcon fab fa-twitter-square"></i>
						</div>
						<img className="logo-img" src={Logo} alt="logo" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
