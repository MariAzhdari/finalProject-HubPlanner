import React from "react";
import { Link } from "react-router-dom";
import "./login.css";


function Login() {
	return (
		<div className="container">
			<div className="imageContainer">
				<img
					src="https://scd.infomigrants.net/media/resize/my_image_medium/dea47db2bea62a59af3aeb9151ff77c0b3d1a12f.jpeg"
					alt="placeholder"
				/>
				<h1>Code Your Future</h1>
				<button className="contactButton">CONTACT Us</button>
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
							href="https://www.instagram.com/codeyourfuture_/?hl=en-gb"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="topIcon fab fa-instagram-square"></i>
						</a>
						<a
							href="https://www.linkedin.com/company/codeyourfuture"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="topIcon fab fa-linkedin"></i>
						</a>

						<a
							href="https://twitter.com/codeyourfuture?lang=en"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="topIcon fab fa-twitter-square"></i>
						</a>
					</div>
				</div>
			</div>
			<div className="contentContainer">
				<h1>CYF Hub Planner</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
					suscipit. Ipsum aliquid pariatur sit in saepe voluptates quam
					repudiandae aspernatur aperiam sapiente debitis adipisci sed
					temporibus, quaerat facilis, architecto quisquam.orem ipsum dolor sit
					amet consectetur adipisicing elit. Cupiditate, suscipit. Ipsum aliquid
					pariatur sit in saepe voluptates quam repudiandae aspernatur aperiam
					sapiente debitis adipisci sed temporibus, quaerat facilis, architecto
					quisquam.
				</p>
				<button className="loginButton">
					<Link className="link" to="/form">
						Login with github
					</Link>
				</button>
			</div>
		</div>
	);
}

export default Login;

