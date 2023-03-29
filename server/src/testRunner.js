const express = require("express");
const cors = require("cors");
const multer = require("multer");

const {
	LoginService,
	RegisterService,
	JobPostsService,
	ApplyService,
	OffersService,
	ProfileService,
	SearchService,
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
app.use("/search", SearchService);

const upload = multer({ storage: multer.memoryStorage() });

module.exports = app;
