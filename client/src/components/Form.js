// import React from "react";
// import Logo1 from "./img/cyfLogo1.png";
// import { Link } from "react-router-dom";
// import  axios  from "axios";
// import "./form.css";

// function Form() {
// 	async function loginHandler(e){
// 		e.preventDefault();
// 		const response =await axios.post("/api/register",{ email:"nik@gmail.com",password:"123j" ,role:"tr",city:"shiraz" });
// 		console.log(response.data);
// 		}
//   return (
// 		<>
// 			<div className="navbar">
// 				<ul className="navList">
// 					<li className="navListItem">
// 						<Link className="link" to="/main">
// 							MAIN
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/calendar">
// 							CYF CALENDAR
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/attendance">
// 							ATTENDANCE
// 						</Link>
// 					</li>
// 					<li className="navListItem">
// 						<Link className="link" to="/travel">
// 							TRAVEL CHECK
// 						</Link>
// 					</li>
// 				</ul>
// 				<img className="logo-img" src={Logo1} alt="logo" />
// 			</div>

// 			<div className="login">
// 				<span className="loginTitle">
// 					<img className="logo1" src={Logo1} alt="logo" />
// 				</span>

// 				<form className="loginForm">
// 					<label>Email</label>
// 					<input
// 						className="loginInput"
// 						type="text"
// 						placeholder="Enter your email..."
// 					/>

// 					<label>Password</label>
// 					<input
// 						className="loginInput"
// 						type="password"
// 						placeholder="Enter your password..."
// 					/>

// 					<label>City</label>
// 					<select className="loginInput">
// 						<option value="london">London</option>
// 					</select>

// 					<label>Role</label>
// 					<select className="loginInput">
// 						<option value="trainee">Trainee</option>
// 						<option value="volunteer">PD-Volunteer</option>
// 						<option value="volunteer">Tech-Volunteer</option>
// 					</select>
// 					<button className="loginButton" onClick={loginHandler}>Login</button>
// 				</form>
// 			</div>
// 		</>
// 	);
// }

// export default Form;




import React, { useState } from "react";
import Logo1 from "./img/cyfLogo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./form.css";

function Form() {
	const [name,setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [city, setCity] = useState("london"); // Default value
	const [role, setRole] = useState("trainee"); // Default value

	async function loginHandler(e) {
		e.preventDefault();
		const response = await axios.post("/api/register", {
			name,
			email,
			password,
			role,
			city,
		});
		console.log(response.data);
	}

	return (
		<>
			{/*... Rest of your code ...*/}

			<form className="loginForm">

				<label>Name</label>
				<input
					className="loginInput"
					type="text"
					placeholder="Enter your name..."
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label>Email</label>
				<input
					className="loginInput"
					type="text"
					placeholder="Enter your email..."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label>Password</label>
				<input
					className="loginInput"
					type="password"
					placeholder="Enter your password..."
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label>City</label>
				<select
					className="loginInput"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				>
					<option value="london">London</option>
					{/* Add more options if needed */}
				</select>

				<label>Role</label>
				<select
					className="loginInput"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				>
					<option value="trainee">Trainee</option>
					<option value="pd-volunteer">PD-Volunteer</option>
					<option value="tech-volunteer">Tech-Volunteer</option>
				</select>

				<button className="loginButton" onClick={loginHandler}>
					Login
				</button>
			</form>

			{/*... Rest of your code ...*/}
		</>
	);
}

export default Form;

