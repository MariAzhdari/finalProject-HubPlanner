import React from "react";
import Logo1 from "./img/cyfLogo1.png";
import { Link } from "react-router-dom";
import "./form.css";

function Form() {
  return (
		<>
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
				<img className="logo-img" src={Logo1} alt="logo" />
			</div>

			<div className="login">
				<span className="loginTitle">
					<img className="logo1" src={Logo1} alt="logo" />
				</span>

				<form className="loginForm">
					<label>Email</label>
					<input
						className="loginInput"
						type="text"
						placeholder="Enter your email..."
					/>

					<label>Password</label>
					<input
						className="loginInput"
						type="password"
						placeholder="Enter your password..."
					/>

					<label>City</label>
					<select className="loginInput">
						<option value="london">London</option>
					</select>

					<label>Role</label>
					<select className="loginInput">
						<option value="trainee">Trainee</option>
						<option value="volunteer">PD-Volunteer</option>
						<option value="volunteer">Tech-Volunteer</option>
					</select>

					<button className="loginButton">Login</button>
				</form>
			</div>
		</>
	);
}

export default Form;
