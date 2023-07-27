import React, { useState } from "react";

const TravelDisruption = () => {
	const [disruptions, setDisruptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	return (
		<div>
			<h2>Travel Disruptions</h2>
			<button></button>
			<p></p>
			<p>No disruptions found.</p>
			<ul>
				<li></li>
			</ul>
		</div>
	);
};

export default TravelDisruption;
