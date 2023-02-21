const express = require("express");
const cors = require("cors");

const { LoginService, RegisterService } = require("./services");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", LoginService);
app.use("/register", RegisterService);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
