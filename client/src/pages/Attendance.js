import React, { useState } from "react";

const Attendance = () => {
        const [volunteers, setVolunteers] = useState([]);
		const [trainees, setTrainees] = useState([]);
		const [loading, setLoading] = useState(true);
	return (
		<div>
			<h2>Attendance</h2>
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
							<tr>
								<td></td>
								<td></td>
								<td>
									<select>
										<option>In-Person</option>
										<option>Remote</option>
									</select>
								</td>
							</tr>
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
							<tr>
								<td></td>
								<td></td>
								<td>
									<select>
										<option>In-Person</option>
										<option>Remote</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		</div>
	);
};


export default Attendance;
