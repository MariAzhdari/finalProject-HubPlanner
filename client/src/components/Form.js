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

	const allFieldsFilled = name && email && password; 


	async function loginHandler(e) {
		e.preventDefault();

	if (!allFieldsFilled) {
				alert("All fields must be filled out!");
				return;
			}


		const response = await axios.post("/api/login", {
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
			<img className="logo-img" src={Logo1} alt="logo" />
			<form className="loginForm">
				<label className="label">Name</label>
				<input
					className="loginInput"
					type="text"
					placeholder="Enter your name..."
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label className="label">Email</label>
				<input
					className="loginInput"
					type="text"
					placeholder="Enter your email..."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label className="label">Password</label>
				<input
					className="loginInput"
					type="password"
					placeholder="Enter your password..."
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label className="label">City</label>
				<select
					className="loginInput"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				>
					<option value="london">London</option>
					{/* Add more options if needed */}
				</select>

				<label className="label">Role</label>
				<select
					className="loginInput"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				>
					<option value="trainee">Trainee</option>
					<option value="pd-volunteer">PD-Volunteer</option>
					<option value="tech-volunteer">Tech-Volunteer</option>
				</select>

				<button onClick={loginHandler}  className="loginButton" type="submit">
					{allFieldsFilled ? (
						<Link className="link" to="/main">
							Login
						</Link>
					) : (
						"Login" // If not all fields are filled, just render "Login" text
					)}
				</button>
			</form>

			{/*... Rest of your code ...*/}
		</>
	);
}

export default Form;

