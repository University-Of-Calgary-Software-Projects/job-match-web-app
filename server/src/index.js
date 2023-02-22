const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const db = new Database("jobmatch.db", { verbose: console.log });

const {
	LoginService,
	RegisterService,
	JobPostsService,
	ApplyService,
	OffersService,
	ProfileService,
} = require("./services");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", LoginService);
app.use("/register", RegisterService);
app.use("/job-posts", JobPostsService);
app.use("/apply", ApplyService);
app.use("/offers", OffersService);
app.use("/profile", ProfileService);


app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
