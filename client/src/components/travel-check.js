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
		</div>
<div>
<div>
<button className="travel-button">check Travel Disruptions</button>
</div>
<div>
<p>Date</p>
<div/>
<div/>
	);
};

export default TravelCheck;
