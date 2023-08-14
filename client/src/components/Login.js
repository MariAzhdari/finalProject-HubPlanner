import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Logo from "./img/CYF-logo2.png";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// New state for show/hide password
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState(localStorage.getItem("user") || null);
	const navigate = useNavigate();

	const allFieldsFilled = email && password;

	async function loginHandler(e) {
		e.preventDefault();

		if (!allFieldsFilled) {
			alert("All fields must be filled out!");
			return;
		}

		const response = await axios.post("/api/login", {
			email,
			password,
		});

		setUser(response.data);
		console.log(response.data);
		localStorage.setItem("user", JSON.stringify(response.data));
		if (response.data.email) {
			navigate("/main");
		} else {
			alert(response.data);
		}
	}

	return (
		<div className="container">
			<div className="imageContainer">
				<img src={Logo} alt="placeholder" />
				<h1 className="cyfName">Code Your Future</h1>
				<div className="down">
					<div className="downLeft">
						<div className="down">
							<div className="downLeft">
								<a
									href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="topIcon fab fa-facebook-square"></i>
								</a>
								<a
									href="https://www.instagram.com/codeyourfuture_/channel/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="topIcon fab fa-instagram-square"></i>
								</a>
								<a
									href="https://twitter.com/codeyourfuture?lang=en"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="topIcon fab fa-twitter-square"></i>
								</a>
								<a href="mailto:contact@codeyourfuture.io">
									<i className="topIcon fas fa-envelope-square"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="contentContainer">
				<h1>CYF Hub Planner</h1>
				<form className="loginForm">
					<div className="inputWrapper">
						<input
							className="loginInput transparentInput"
							type="text"
							placeholder="Enter your email..."
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="inputWrapper">
						<input
							className="loginInput transparentInput"
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<i
							className={
								showPassword
									? "fas fa-eye-slash passwordToggleIcon"
									: "fas fa-eye passwordToggleIcon"
							}
							onClick={() => setShowPassword(!showPassword)}
						></i>
					</div>

					<button onClick={loginHandler} className="loginButton" type="submit">
						Login
					</button>
					<p>
						Don't have an account? <Link to="/form">Register</Link>
					</p>
					{!allFieldsFilled}
				</form>
			</div>
		</div>
	);
}

export default Login;

