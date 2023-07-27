import React, { useState, useEffect } from "react";
import "./Attendance.css";

const Attendance = () => {
	const [volunteers, setVolunteers] = useState([]);
	const [trainees, setTrainees] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const volunteerResponse = await fetch("/api/volunteers");
				if (!volunteerResponse.ok) {
					throw new Error("Error fetching volunteer data");
				}
				const volunteerData = await volunteerResponse.json();
				setVolunteers(volunteerData);

				const traineeResponse = await fetch("/api/trainees");
				if (!traineeResponse.ok) {
					throw new Error("Error fetching trainee data");
				}
				const traineeData = await traineeResponse.json();
				setTrainees(traineeData);

				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleAttendanceChange = async (id, attendanceType, role) => {
		try {
			const response = await fetch(`/api/${role}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ attendanceType }),
			});

			if (!response.ok) {
				throw new Error("Error updating attendance");
			}

			// Update the attendance type locally after successful API update
			if (role === "volunteers") {
				setVolunteers((prevVolunteers) =>
					prevVolunteers.map((volunteer) =>
						volunteer.id === id ? { ...volunteer, attendanceType } : volunteer
					)
				);
			} else if (role === "trainees") {
				setTrainees((prevTrainees) =>
					prevTrainees.map((trainee) =>
						trainee.id === id ? { ...trainee, attendanceType } : trainee
					)
				);
			}
		} catch (error) {
			console.error("Error updating attendance:", error);
		}
	};

	return (
		<div>
			<h2>Attendance</h2>
			{loading ? (
				<p>Loading data...</p>
			) : (
				<div>
					<h3>Volunteers</h3>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Attendance Type</th>
							</tr>
						</thead>
						<tbody>
							{volunteers.map((volunteer) => (
								<tr key={volunteer.id}>
									<td>{volunteer.id}</td>
									<td>{volunteer.name}</td>
									<td>
										<select
											value={volunteer.attendanceType}
											onChange={(e) =>
												handleAttendanceChange(
													volunteer.id,
													e.target.value,
													"volunteers"
												)
											}
										>
											<option value="in-person">In-Person</option>
											<option value="remote">Remote</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<h3>Trainees</h3>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Attendance Type</th>
							</tr>
						</thead>
						<tbody>
							{trainees.map((trainee) => (
								<tr key={trainee.id}>
									<td>{trainee.id}</td>
									<td>{trainee.name}</td>
									<td>
										<select
											value={trainee.attendanceType}
											onChange={(e) =>
												handleAttendanceChange(
													trainee.id,
													e.target.value,
													"trainees"
												)
											}
										>
											<option value="in-person">In-Person</option>
											<option value="remote">Remote</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Attendance;
