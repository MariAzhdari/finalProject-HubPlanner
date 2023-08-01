import React from "react";
import "./attendance.css";
import Logo from "./img/cyfLogo1.png";

const Attendance = () => {
	return (
		<div className="top-container">
			<div className="navbar">
				<ul className="navList">
					<li className="navListItem">CYF CALENDAR</li>
					<li className="navListItem">ATTENDANCE</li>
					<li className="navListItem">TRAVEL CHECK</li>
					<li className="navListItem">ABOUT US</li>
				</ul>
				<img className="logo-img" src={Logo} alt="logo" />
			</div>
			<div className="middle-container">
				<form className="middle-container">
					<div className="input-container">
						<input type="text" id="name-input" placeholder="Name"></input>
					</div>
					<div className="role-select">
						<select className="select-container">
							<option>Role</option>
							<option value="volunteer">Volunteer</option>
							<option value="trainee">Trainee</option>
						</select>
					</div>
					<div className="attendence-select">
						<select className="select-container" id="attendanceType">
							<option>Attendance</option>
							<option value="in-person">In-Person</option>
							<option value="remote">Remote</option>
						</select>
					</div>
				</form>
			</div>
			<div className="bottom-container">
				<div>
					<table className="custom-table">
						<caption>Remote</caption>
						<thead>
							<tr>
								<th className="border-right">Volunteers</th>
								<th>Trainee</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<table className="custom-table">
						<caption>In-person</caption>
						<thead>
							<tr>
								<th className="border-right">Volunteers</th>
								<th>Trainee</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Attendance;
