const { Router } = require("express");
const router = Router();
const Database = require("better-sqlite3");
const db = new Database("jobmatch.db", { verbose: console.log });

/**
 * Handle get request, queries the database to get the profile details of the
 * provided user
 * @param role - from req.params
 * @param id - from req.params
 * @returns {object} - returns user details if user exists,
 * else returns a 400 response status
 */
router.get("/:role/:id", async (req, res) => {
	try {
		const { role } = req.params;
		const { id } = req.params;
		let queryResult;

		if (role === "jobSeeker") {
			queryResult = queryJobSeeker(id);
		} else if (role === "hiringManager") {
			queryResult = queryHiringManager(id);
		} else {
			return res
				.status(404)
				.json({ error: "incorrect role was provided" });
		}
		if (queryResult.length === 0) {
			return res
				.status(400)
				.json({ error: "User ID provided is not available" });
		}
		return res.status(200).json({ results: queryResult[0] });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server Error" });
	}
});

/**
 * perform sql query to get the profile details of the job_seeker
 * @param {string} id - id of job_seeker
 * @returns {object} -returns result of sql query
 */
function queryJobSeeker(id) {
	let sql = null; // for sql statements

	//sql query
	sql = `
    SELECT *
    FROM job_seeker
    WHERE ID=?
  `;

	let stmt = db.prepare(sql);
	const result = stmt.all(id);
	return result;
}

/**
 * perform sql query to get the profile details of the hiring manager and
 * the company details, the hiring manager works for
 * @param {string} id - id of hiring manager
 * @returns {object} - return result of sql query
 */
function queryHiringManager(id) {
	let sql; // for sql statements

	//sql query
	sql = `
    SELECT 
    h.ID AS HID,  h.UserName, h.First_Name, h.LAST_NAME, 
    h.Business_Name, h.Business_Industry
    FROM hiring_manager AS h
    WHERE h.ID=?
  `;

	let stmt = db.prepare(sql);
	const result = stmt.all(id);
	return result;
}

module.exports = { ProfileService: router };
