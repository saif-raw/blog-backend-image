const Blog = require("../models/blogSchema.js");

const getAllBlogs = async (req, res) => {
	if (req.query) {
        let findBlog = await Blog.find(req.query);
        
		if (findBlog < 1) {
			res.send("FAILED");
		} else {
			res.send("SUCCESS");
		}
	} else {
		const allBlogs = await Blog.find();
        res.send("SUCCESS");
        console.log("Hello");
	}console.log("Hello");
};

const getBlogById = async (req, res) => {
	const { blogId } = req.params;
	try {
		let blog = await Blog.find({ blogId });
		res.send("SUCCESS");
	} catch (err) {
		res.send("Blog does not exist");
	}
};

const createBlog = async (req, res) => {
	const { blogTitle, blogContent } = req.body;
	let blogRelatedData = JSON.parse(req.body.blogRelatedLinks);
    
    let newBlog;
    console.log(req.body);
	blogRelatedData.forEach(() => {
		newBlog = new Blog({
			blogTitle,
			blogContent,
			blogRelatedLinks: blogRelatedData,
			blogImage: req.file.path,
		});
	});
	try {
		newBlog = await newBlog.save();
		res.send("SUCCESS");
	} catch (err) {
		res.send("FAILED");
	}
};

const updateBlogs = async (req, res) => {
	const { blogId } = req.params;
	const re = /<("[^"]?"|'[^']?'|[^'">])*>/;
	if (re.test(req.params.blogTitle)) {
		res.send("FAILED : Blog cannot be in HTML format");
	} else {
		try {
			let blog = await Blog.updateOne(
				{ blogId },
				{
					$set: {
						blogTitle: req.body.blogTitle,
						blogContent: req.body.blogContent,
					},
				},
				{ runValidators: true }
			);
			res.send("SUCCESS");
		} catch (err) {
			res.send("FAILED to update blog given by ID");
		}
	}
};

const deleteBlogById = async (req, res) => {
	const { blogId } = req.params;
	try {
		let deletedBlog = await Blog.deleteOne({ blogId });
		res.send(`${blogId} Deleted Successfully`);
	} catch (err) {
		res.send("Blog delete FAILED");
	}
};

module.exports = {
	getAllBlogs,
	getBlogById,
	createBlog,
	updateBlogs,
	deleteBlogById,
};
