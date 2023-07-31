import React from "react";
import Logo from "./img/cyfLogo1.png";
import "./travel-check.css";

const TravelCheck = () => {
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
			<div className="Right">
				<div className="">
					<button className="Travelbutton">Check Travel Disruption</button>
				</div>
				<div className="">
					<button className="Datebutton">Date</button>
				</div>
			</div>

			<div className="list-container">
				<div className="list">
					<ul>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TravelCheck;
