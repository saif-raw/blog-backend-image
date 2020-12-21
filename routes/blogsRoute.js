const path = require("path");

const router = require("express").Router();
const {
	getAllBlogs,
	getBlogById,
	createBlog,
	updateBlogs,
	deleteBlogById,
} = require("../controllers/blogController.js");


const multer = require("multer");
const { response } = require("express");

let storage = multer.diskStorage({
	destination: "./images",
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + path.extname(file.originalname));
	},
});


let upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});


const checkFileType = (file, cb) => {

	const filetypes = /jpeg|jpg|png|gif/;

	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Images Only");
	}
}

router.route("/").post(upload.single("blogImage"));

router.route("/").get(getAllBlogs).post(createBlog);

router
	.route("/:blogId")
	.get(getBlogById)
	.put(updateBlogs)
	.delete(deleteBlogById);

module.exports = router;
