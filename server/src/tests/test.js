const request = require('supertest');
const Database = require("better-sqlite3");
const db = new Database("jobmatch.db", { verbose: console.log });
const app = require("../index")
const { getCurrentDate } = require("../utils/Date");


// const sinon = require("sinon");
// const chai = require("chai");

//------------tests for APPLY service---------------------
// describe('POST /apply/', () => {
//   it('should create a new application', async () => {
//     const response = await request(app)
//       .post('/apply/')
//       .field('JID', 'job123')
//       .field('JSID', 'jobseeker123')
//       .field('YOF', '2022')
//       .field('additionalInfo', 'some additional info')
//       .attach('resumeData', 'test/fixtures/resume.pdf');

//     expect(response.status).toBe(200);
//     expect(response.body.msg).toEqual('successfully added application');
//   });

//   it('should handle errors', async () => {
//     const response = await request(app)
//       .post('/apply/')
//       .field('JID', 'job123')
//       .field('JSID', 'jobseeker123')
//       .field('YOF', '2022')
//       .field('additionalInfo', 'some additional info')
//       .attach('invalidFileField', 'test/fixtures/resume.pdf');

//     expect(response.status).toBe(400);
//     expect(response.body.error).toEqual('could not application');
//   });
// });



// describe("GET /:id/applications", () => {
//   beforeAll(async () => {
//     // set up database test data before running tests
//     // this assumes that the database is already connected
//     // and there is test data in the tables
//   });

//   afterAll(async () => {
//     // clean up database test data after running tests
//     // this assumes that the database is already connected
//     // and the test data has been removed
//   });

//   it("should return a list of job applications for a job seeker", async () => {
//     const id = 123; // assuming this is the ID of a job seeker in the database

//     const response = await request(app).get(`/${id}/applications`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("results");
//     expect(response.body.results).toHaveLength(3); // assuming there are 3 test applications for this job seeker
//   });

//   it("should return a 500 error if there's a server error", async () => {
//     jest.spyOn(db, "prepare").mockImplementation(() => {
//       throw new Error("Database error");
//     });
//     const id = 456; // assuming this is the ID of a job seeker in the database

//     const response = await request(app).get(`/${id}/applications`);

//     expect(response.status).toBe(500);
//     expect(response.body).toHaveProperty("error");
//     expect(response.body.error).toBe("Server Error");
//   });
// });



describe("GET /:id/applications", () => {
  const date = getCurrentDate();
  beforeAll(async () => {
    // Seed the database with test data
    
    const dummyResume = null;
    await db.exec(`

      INSERT INTO job_seeker (ID, FirstName, LastName, Email, Username, Password, Location ) 
      VALUES ('1', 'John', 'Doe', 'fuck.com', 'asasasasa', 'aaaa', 'calgary');

      INSERT INTO hiring_manager (ID, UserName, Password, Business_Name, Business_Industry, First_Name, Last_Name, Business_Dept) 
      VALUES ('345','hello','..', 'abc', 'IT','fuck','you', 'bitch');

      INSERT INTO job_post (ID, JobName, Salary, Duration, WorkingHours, HID, Description, DatePosted, Industry ) 
      VALUES ('56', 'Developer', 100000, 12, 8, '345', '', ${date},'IT' );

      INSERT INTO application ( YearsOfExperience, JSID, JID, additionalInfo, applicationDate, pdf_data) 
      VALUES ('5','1', '56','blahblah', ${date}, ${dummyResume} );
    `);
  });

  afterAll(async () => {
    // Clean up the database after each test
    await db.exec(`
      DELETE FROM application WHERE JSID = 1 AND JID = 56;
      DELETE FROM job_post WHERE ID = 56;
      DELETE FROM hiring_manager WHERE ID = 345;
      DELETE FROM job_seeker WHERE ID = 1;
    `);
  });

  it("should return a list of applications for the specified job seeker", async () => {
    const res = await request(app).get("/1/applications");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      results: [
        {
          JobName: "Developer",
          Salary: 100000,
          Duration: 12,
          WorkingHours: 8,
          Business_Name: "abc",
          Business_Industry: "IT",
          applicationDate: date+"",
        },
      ],
    });
  });
});

//----------  PROFILE SERVICE--------------------------------------

// const chai = require("chai");
// const expect = chai.expect;


// describe("GET /:role/:id", () => {
//   beforeEach(() => {
//     // Mock the database connection
//     sinon.stub(db, "prepare");
//   });

//   afterEach(() => {
//     // Restore the database connection
//     db.prepare.restore();
//   });

//   it("returns a 200 response with the user's profile details", async () => {
//     const queryResult = {
//       id: 123,
//       name: "John Doe",
//       skills: [{ key: 1, label: "JavaScript" }, { key: 2, label: "React" }],
//     };

//     // Mock the query function to return the expected result
//     db.prepare.returns({
//       all: sinon.fake.returns([queryResult]),
//     });

//     const res = await request(app).get("/jobSeeker/123");

//     expect(res.statusCode).to.equal(200);
//     expect(res.body).to.deep.equal({
//       results: queryResult,
//       skills: queryResult.skills,
//     });
//   });

//   it("returns a 400 response when the user ID is not available", async () => {
//     // Mock the query function to return an empty result
//     db.prepare.returns({
//       all: sinon.fake.returns([]),
//     });

//     const res = await request(app).get("/jobSeeker/123");

//     expect(res.statusCode).to.equal(400);
//     expect(res.body).to.deep.equal({
//       error: "User ID provided is not available",
//     });
//   });
// });