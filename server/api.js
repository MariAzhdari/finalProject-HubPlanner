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
		if (password !== user.rows[0].password) {
			return res.json("Invalid password");
		}
		// eslint-disable-next-line no-console
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
// endpoint for calender data//
router.get("/fetch-calendar-data",async (_, res) => {
	try {
		//  const currentDate = new Date();
		// 	const currentWeekNumber = Math.ceil(
		// 		(currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 604800000
		// 	);
		// const currentDate = new Date();
		// const currentDayOfWeek = currentDate.getDay();
		// const daysToSubtract = currentDayOfWeek;
		// const startOfWeek = new Date(currentDate);
		// startOfWeek.setDate(startOfWeek.getDate() - daysToSubtract);
		// const endOfWeek = new Date(startOfWeek);
		// endOfWeek.setDate(endOfWeek.getDate() + 6);
		const calenderData = await pool.query(
			// "SELECT * FROM session WHERE EXTRACT(WEEK FROM session_date) = EXTRACT(WEEK FROM CURRENT_DATE) "
			"SELECT * FROM session"
		);

		res.json(calenderData.rows);
		// const currentDate = new Date().toISOString(); // Get current date in ISO format

	// 	const query = `
    //   SELECT *
    //   FROM session
    //   WHERE session_date > $1
    //   ORDER BY session_date ASC
    //   LIMIT 1`;
//   const sessionData = await pool.query(query, [currentDate]);
		// const sessionData = await pool.query(
		// 	"SELECT * FROM session WHERE session_date > $1 ORDER BY session_date ASC LIMIT 1`; ",
		// 	[currentDate]
		// );
		// res.json(sessionData.rows);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching session data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});



////////////////////////////////
//******Attendance page******//
///////////////////////////////

// router.get("/fetch-attendance-data", async (_, res) => {
// 	try {
// 		const attendanceData = await pool.query("SELECT * FROM Attendance; ");
// 		res.json(attendanceData.rows);
// 	} catch (error) {
// 		console.error("Error fetching attendance data:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });


// // Submit attendance data
// router.post("/submit-attendance", async (req, res) => {
//   const { userID ,name, role, date, attendanceType } = req.body;

//   try {

//     const newAttendance = await pool.query(
//       "INSERT INTO Attendance (userid, name, role, date, attendance_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [userID, name, role, date, attendanceType]
//     );

//     res.status(201).json(newAttendance.rows[0]);
//   } catch (error) {
//     console.error("Error submitting attendance:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Fetch attendance data
router.get("/fetch-attendance-data", async (_, res) => {
	try {
		const attendanceData = await pool.query("SELECT * FROM Attendance; ");
		res.json(attendanceData.rows);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching attendance data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Check if user has already submitted attendance for a specific date
router.post("/check-attendance", async (req, res) => {
  const { userID, date } = req.body;

  try {
    const existingAttendance = await pool.query(
      "SELECT * FROM Attendance WHERE userid = $1 AND date = $2",
      [userID, date]
    );

    if (existingAttendance.rows.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user's previous attendance for a specific date
router.post("/delete-attendance", async (req, res) => {
  const { userID, date } = req.body;

  try {
    await pool.query(
      "DELETE FROM Attendance WHERE userid = $1 AND date = $2",
      [userID, date]
    );

    res.status(204).send(); // 204 No Content - successful deletion
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit attendance data
router.post("/submit-attendance", async (req, res) => {
  const { userID ,name, role, date, attendanceType } = req.body;

  try {
    // Check if the user has already submitted attendance
    const existingAttendance = await pool.query(
      "SELECT * FROM Attendance WHERE userid = $1 AND date = $2",
      [userID, date]
    );

    if (existingAttendance.rows.length > 0) {
      // Delete the user's previous submission
      await pool.query(
        "DELETE FROM Attendance WHERE userid = $1 AND date = $2",
        [userID, date]
      );
    }

    const newAttendance = await pool.query(
      "INSERT INTO Attendance (userid, name, role, date, attendance_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userID, name, role, date, attendanceType]
    );

    res.status(201).json(newAttendance.rows[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error submitting attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// new Fetch attendees by selected date:
router.post("/fetch-attendees-by-date", async (req, res) => {
	const selectedDate = req.body.date;
  console.log(selectedDate);

	try {
		const attendanceData = await pool.query(
			"SELECT * FROM Attendance WHERE date = $1",
			[selectedDate]
		);
		// const names = attendanceData.rows.map((user) => user.name);
		res.json(attendanceData.rows);
    console.log(attendanceData.rows);
	} catch (error) {
		console.error("Error fetching attendees by date:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});




// old Fetch attendees by selected date
// router.get("/fetch-attendees-by-date", async (req, res) => {
//     const selectedDate = req.query.date;

//     try {
//         const attendanceData = await pool.query(
//             "SELECT * FROM Attendance WHERE date = $1",
//             [selectedDate]
//         );
//         res.json(attendanceData.rows);
//     } catch (error) {
//         console.error("Error fetching attendees by date:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });









//////old/////
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

///////////////////////////////////////////
///*******end of attendance page********//
//////////////////////////////////////////

export default router;





