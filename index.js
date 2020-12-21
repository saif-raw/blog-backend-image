const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routeBlog = require("./routes/blogsRoute.js");

dotenv.config({
	path: "./config.env",
});

mongoose.connect(
	process.env.DB_URL,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log(err);
		}
		console.log("Successful");
	}
);

const app = express();
app.use(express.json());
app.use("/blogs", routeBlog);
app.use("/images", express.static("images"));

app.listen(process.env.PORT, () => {
	console.log(`Server  is listening on PORT ${process.env.PORT}`);
});
