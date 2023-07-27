import React, { useState } from "react";
import "./TravelDisruption.css";

const TravelDisruption = () => {
	const [disruptions, setDisruptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchDisruptions = async () => {
		setLoading(true);
		setError(null);

		try {
			// Replace this with your local API endpoint to fetch disruptions
			const response = await fetch("/api/disruptions");
			if (!response.ok) {
				throw new Error("Failed to fetch disruptions");
			}
			const data = await response.json();
			setDisruptions(data);
		} catch (error) {
			setError("Error fetching travel disruptions");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="travel-disruptions-container">
			<h2>Travel Disruptions</h2>
			<button onClick={fetchDisruptions} disabled={loading}>
				{loading ? "Loading..." : "Fetch Disruptions"}
			</button>
			{error && <p className="error-message">{error}</p>}
			{!loading && disruptions.length === 0 && (
				<p className="no-disruptions">No disruptions found.</p>
			)}
			<ul>
				{disruptions.map((disruption) => (
					<li key={disruption.id}>{disruption.message}</li>
				))}
			</ul>
		</div>
	);
};

export default TravelDisruption;
