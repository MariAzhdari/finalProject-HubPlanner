import React from "react";
// import "./attendance.css";
import Logo from "./img/cyfLogo1.png";
const AttendanceTable = () => {
	return (
		<div className="table-container">
			<div className="navbar">
				<ul className="navList">
					<li className="navListItem">CYF CALENDAR</li>
					<li className="navListItem">ATTENDANCE</li>
					<li className="navListItem">TRAVEL CHECK</li>
					<li className="navListItem">ABOUT US</li>
				</ul>
				<img className="logo-img" src={Logo} alt="logo" />
			</div>
			<h2>Attendance Form</h2>
			<form>
				<div className="attendee">
					<label for="name">Name:</label>
					<input type="text" id="name" required />
				</div>
				<div className="form-Role">
					<label>Role</label>
					<select className="personInput">
						<option value="volunteer">Volunteer</option>
						<option value="trainee">Trainee</option>
					</select>
					<label for="attendanceType">Attendance Type:</label>
					<select className="PersonInput"  id="attendanceType">
						<option value="in-person">In-Person</option>
						<option value="remote">Remote</option>
					</select>
				</div>
				<div class="form-group">
					<button className="loginButton" type="submit">
						Submit
					</button>
				</div>
			</form>
			<h2>Trainee</h2>
			<table className="custom-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Attendance</th>
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
			<h2>Volounteers</h2>
			<table className="custom-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Attendance</th>
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
	);
};
export default AttendanceTable;

