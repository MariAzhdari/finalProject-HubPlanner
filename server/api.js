import { Router } from "express";
// import bcrypt from "bcryptjs/dist/bcrypt";
import pool from "./db";
// import jwtGenerator from "./utils/middelware/jwtGenerator";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Happy final project 🎉 We are group three!" });
});


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



export default router;





