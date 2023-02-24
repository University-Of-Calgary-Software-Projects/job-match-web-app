const { Router } = require("express");
const router = Router();
const Database = require("better-sqlite3");
const db = new Database("jobmatch.db", { verbose: console.log });

/**
 * Handle get request, to view the offers owned by a user
 * @param - role (either a jobSeeker, hiring manager)
 */
router.get("/:role/:id", async (req, res) => {
	try {
		const { role } = req.params;
		const { id } = req.params;

		if (role === "jobSeeker") {
			queryResult = queryJobSeeker(id);
		} else if (role === "hiringManager") {
			queryResult = queryHiringManager(id);
		} else {
			return res
				.status(404)
				.json({ error: "incorrect role was provided" });
		}
		return res.status(200).json({ results: queryResult });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server Error" });
	}
});

/**
 * get the offers owned by the jobSeeker
 * @param {string} id - jobSeeker id
 */
function queryJobSeeker(id) {
	//sql query
	let sql = `
  SELECT o.Salary, o.JobSeekerStatus, o.ClientStatus,
  h.First_Name || ' ' || h.Last_Name AS hName, h.Business_Name AS businessName, h.Business_Industry
  FROM offer AS o, job_seeker AS f, hiring_manager AS h
  WHERE o.JSID = f.ID AND h.ID=o.HID
  AND f.ID=?
  `;
	let stmt = db.prepare(sql);
	const result = stmt.all(id);
	return result;
}

/**
 * get the offers owned by the hiring manager
 * @param {string} id - hiring manager id
 */
function queryHiringManager(id) {
	let sql; // for sql statements

	//sql query
	sql = `
  SELECT f.FirstName || ' ' || f.LastName AS name,
  o.ClientStatus AS clientstatus, o.JobSeekerStatus AS jobSeekerstatus, 
  o.Salary AS salary, f.PhoneNo, f.Email AS email
  FROM offer AS o, job_seeker AS f
  WHERE HID=?
  AND o.JSID = f.ID
  `;

	let stmt = db.prepare(sql);
	const result = stmt.all(id);
	return result;
}

module.exports = { OffersService: router };
