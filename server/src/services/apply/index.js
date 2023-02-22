const { Router } = require("express");
const router = Router();
const Database = require("better-sqlite3");
const { uuid } = require("../../utils/GenerateID");
const { getCurrentDate } = require("../../utils/Date");
const db = new Database("jobmatch.db", { verbose: console.log });

/**
 * apply to a job post
 * @param JID - job id
 * @param JSID - jobseeker id
 * @param YOF - years of experience
 * @param resumeUrl - link to url
 * @param additionalInfo - additional info to add to the application
 * @returns {object} - returns successful message if application added, else return
 * error msg
 */
router.post("/", async (req, res) => {
	try {
		const { JID, JSID, YOF, resumeUrl, additionalInfo } = req.body;
		const date = getCurrentDate();

		let sql = `
	  INSERT INTO application
	  VALUES (?, ?, ?, ?, ?, ?)
	  `;
		stmt = db.prepare(sql);
		const result = stmt.run(
			YOF,
			resumeUrl,
			JSID,
			JID,
			additionalInfo,
			date
		);
		console.log(result);
		return res.status(200).json({ msg: "successfully added application" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error: "could not application" });
	}
});

/**
 * returns all applications owned by the jobseeker
 * @param id - jobseeker id
 */
router.get("/:id/applications", async (req, res) => {
	try {
		const { id } = req.params;
		let queryResult = `
    SELECT j.JobName, j.Salary, j.Duration, 
    j.WorkingHours, h.Business_Name, h.Business_Industry, a.applicationDate
    FROM application AS a, job_seeker AS f, 
    job_post AS j, hiring_manager AS h
    WHERE f.ID=a.JSID AND a.JID=j.ID 
    AND j.HID=h.ID AND f.ID=?
    `;
		let stmt = db.prepare(queryResult);
		const result = stmt.all(id);

		return res.status(200).json({ results: result });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server Error" });
	}
});

module.exports = { ApplyService: router };
