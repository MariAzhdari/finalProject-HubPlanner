import React, { useState } from "react";

const TravelDisruption = () => {
	const [disruptions, setDisruptions] = useState([]);

	const fetchDisruptions = async () => {
		try {
			// Replace this with your local API endpoint to fetch disruptions
			const response = await fetch("/api/disruptions");
			const data = await response.json();
			setDisruptions(data);
		} catch (error) {
			console.error("Error fetching travel disruptions:", error);
		}
	};

	return (
		<div>
			<h2>Travel Disruptions</h2>
			<button onClick={fetchDisruptions}>Fetch Disruptions</button>
			<ul>
				{disruptions.map((disruption) => (
					<li key={disruption.id}>{disruption.message}</li>
				))}
			</ul>
		</div>
	);
};
export default TravelDisruption;