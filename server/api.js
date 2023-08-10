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

router.get("/api/disruptions/:date", async (req, res) => {
 const date = req.params.date;
// Construct the URL for the external API
 const apiUrl = `https://api.digital.tfl.gov.uk/Line/Mode/tube,dlr/Disruption/Disruption/${date}`;
 try {
     const response = await axios.get(apiUrl);
     res.json(response.data);
 } catch (error) {
     console.error("Error fetching disruptions from external API:", error);
     res.status(500).json({
         error: "Failed to fetch data from the external API.",
     });
 }
});


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




export default router;





