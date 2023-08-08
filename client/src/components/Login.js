// import React from "react";
// import { Link } from "react-router-dom";
// import "./login.css";
// import Logo from "./img/CYF-logo2.png";



// function Login() {
// 	return (
// 		<div className="container">
// 			<div className="imageContainer">
// 				<img src={Logo} alt="placeholder" />
// 				<h1 className="cyfName">Code Your Future</h1>
// 				{/* <button className="contactButton">CONTACT Us</button> */}
// 				<div className="down">
// 					<div className="downLeft">
// 						<a
// 							href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB"
// 							target="_blank"
// 							rel="noopener noreferrer"
// 						>
// 							<i className="topIcon fab fa-facebook-square"></i>
// 						</a>

// 						<a
// 							href="https://www.instagram.com/codeyourfuture_/?hl=en-gb"
// 							target="_blank"
// 							rel="noopener noreferrer"
// 						>
// 							<i className="topIcon fab fa-instagram-square"></i>
// 						</a>
// 						<a
// 							href="https://www.linkedin.com/company/codeyourfuture"
// 							target="_blank"
// 							rel="noopener noreferrer"
// 						>
// 							<i className="topIcon fab fa-linkedin"></i>
// 						</a>

// 						<a
// 							href="https://twitter.com/codeyourfuture?lang=en"
// 							target="_blank"
// 							rel="noopener noreferrer"
// 						>
// 							<i className="topIcon fab fa-twitter-square"></i>
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="contentContainer">
// 				<h1>CYF Hub Planner</h1>
// 				<p>
// 					<li>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
// 						suscipit. Ipsum aliquid pariatur sit in saepe voluptates quam
// 					</li>
// 					<li>
// 						amet consectetur adipisicing elit. Cupiditate, suscipit. Ipsum
// 						aliquid pariatur sit in saepe voluptates quam repudiandae aspernatur
// 						aperiam
// 					</li>
// 					<li>
// 						sapiente debitis adipisci sed temporibus, quaerat facilis,
// 						architecto quisquam.
// 					</li>
// 				</p>
// 				<button className="loginButton">
// 					<Link className="link" to="/form">
// 						Register
// 					</Link>
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Logo from "./img/CYF-logo2.png";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
		}else{
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
						<i className="topIcon fab fa-facebook-square"></i>
						<i className="topIcon fab fa-instagram-square"></i>
						<i className="topIcon fab fa-pinterest-square"></i>
						<i className="topIcon fab fa-twitter-square"></i>
					</div>
					</div>
				</div>
				</div>
			</div>
			<div className="contentContainer">
				<h1>CYF Hub Planner</h1>
				<p>{/* ... some texts ... */}</p>
				<form className="loginForm">
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

					<button onClick={loginHandler} className="loginButton" type="submit">
						Login
					</button>
					<p>
						Don't have an account? <Link to="/form">Register</Link>
					</p>
					{!allFieldsFilled && <p>all filled </p>}
				</form>
			</div>
		</div>
	);
}

export default Login;

