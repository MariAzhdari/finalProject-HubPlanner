import { Router } from "express";
// import bcrypt from "bcryptjs/dist/bcrypt";
import pool from "./db";
// import jwtGenerator from "./utils/middelware/jwtGenerator";
import logger from "./utils/logger";
// import axios from "axios";
// import { render } from "react-dom";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Happy final project 🎉 We are group three!" });
});

// register endPoint************************************************

router.post("/register",  async (req, res) => {
	const { name ,email,  password ,role ,city } = req.body;
	//  console.log(req.body);

	try {
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
	if(user.rows.length > 0) {
				return res
					.status(400)
					.json({ error: "User with this email already registered." });
			}
    if (user.rows.length > 0) {
			return res.json(user.rows[0]);
		}
        let newUser = await pool.query(
			"INSERT INTO users (name, email, password, role, city) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
			[name, email, password, role, city]
		);
        res.json(newUser.rows[0]);
		// const jwtToken = jwtGenerator(newUser.rows[0].user_id);
		// return res.json({ jwtToken });
	} catch (err) {
		// res.status(500).send(err);
		res.json(err);
	}
});



//Login endPoint*************************************************
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
    try {
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (user.rows.length === 0) {
			return res.json("Invalid user");
		}
		if (!password === user.rows[0].password) {
			return res.json("Invalid password");
		}
		console.log(user.rows[0]);
 res.json(user.rows[0]);
	} catch (err) {
		res.send("Server error");
	}
});

// travel api disruptions ************************************** with date()
//*************************************************************** */

// router.get("/api/disruptions/:date", async (req, res) => {
//  const date = req.params.date;
// // Construct the URL for the external API
//  const apiUrl = `https://api.digital.tfl.gov.uk/Line/Mode/tube,dlr/Disruption/Disruption/${date}`;
//  try {
//      const response = await axios.get(apiUrl);
//      res.json(response.data);
//  } catch (error) {
//      console.error("Error fetching disruptions from external API:", error);
//      res.status(500).json({
//          error: "Failed to fetch data from the external API.",
//      });
//  }
// });


//I deleted date in this part for travel api


// router.get("/api/disruptions", async (req, res) => {
//  const apiUrl = "https://api.digital.tfl.gov.uk/Line/Mode/tube,dlr/Disruption/Disruption";
//  try {
//      const response = await axios.get(apiUrl);
//      res.json(response.data);
//  } catch (error) {
//      console.error("Error fetching disruptions from external API:", error);
//      res.status(500).json({
//          error: "Failed to fetch data from the external API.",
//      });
//  }
// });




////////////////////////////////
//******Attendance page******//
///////////////////////////////

router.get("/fetch-attendance-data", async (_, res) => {
	try {
		const attendanceData = await pool.query("SELECT * FROM Attendance; ");
		res.json(attendanceData.rows);
	} catch (error) {
		console.error("Error fetching attendance data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});


// Submit attendance data
router.post("/submit-attendance", async (req, res) => {
  const { userID ,name, role, date, attendanceType } = req.body;

  try {

    const newAttendance = await pool.query(
      "INSERT INTO Attendance (userid, name, role, date, attendance_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userID, name, role, date, attendanceType]
    );

    res.status(201).json(newAttendance.rows[0]);
  } catch (error) {
    console.error("Error submitting attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Fetch user data
// router.get("/fetch-user-data", async (req, res) => {
// 	try {

// 		const userId = getUserIdFromRequest(req); // Define a function to extract userId from the request or authentication context
// 		const user = await dbPool.query(
// 			"SELECT name, role FROM users WHERE id = $1",
// 			[userId]
// 		);
// 		res.json(user.rows[0]);
// 	} catch (error) {
// 		console.error("Error fetching user data:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

// // Fetch attendance data
// router.get("/fetch-attendance-data", async (_, res) => {
//   try {
//     const attendanceData = await dbPool.query(
//       "SELECT name, role, attendance_type FROM Attendance INNER JOIN users ON Attendance.userID = users2.id"
//     );

//     const inPersonVolunteers = attendanceData.rows.filter(
//       (row) => row.attendance_type === "in-person" && row.role === "Volunteer"
//     );

//     const inPersonTrainees = attendanceData.rows.filter(
//       (row) => row.attendance_type === "in-person" && row.role === "Trainee"
//     );

//     const onlineVolunteers = attendanceData.rows.filter(
//       (row) => row.attendance_type === "online" && row.role === "Volunteer"
//     );

//     const onlineTrainees = attendanceData.rows.filter(
//       (row) => row.attendance_type === "online" && row.role === "Trainee"
//     );

//     res.json({
//       inPersonVolunteers,
//       inPersonTrainees,
//       onlineVolunteers,
//       onlineTrainees,
//     });
//   } catch (error) {
//     console.error("Error fetching attendance data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Submit attendance data
// router.post("/submit-attendance", async (req, res) => {
//   const { name, role, date, attendanceType } = req.body;

//   try {
//     const userId = getUserIdFromRequest(req); // Define a function to extract userId from the request or authentication context
//     const newAttendance = await dbPool.query(
//       "INSERT INTO Attendance (userID, name, role, date, attendance_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [userId, name, role, date, attendanceType]
//     );

//     res.status(201).json(newAttendance.rows[0]);
//   } catch (error) {
//     console.error("Error submitting attendance:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Start the server
// router.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Define a function to extract userId from the request or authentication context
// function getUserIdFromRequest(req) {
//   // Replace this with your actual code to get userId from authentication
//   // For example, if you have user authentication middleware, you might do something like:
//   // return req.user.id;
//   // For now, this example returns a placeholder value "123".
//    if (req.user && req.user.id) {
//     return req.user.id;
// }
// }



export default router;





