const mongoose = require("mongoose");
const uniqid = require("uniqid");

const relatedBlogHandler = require("../helpers/relatedBlogHandler.js");

const blogSchema = new mongoose.Schema(
	{
		blogId: {
			type: String,
			default: uniqid(),
			unique: true,
		},
		blogTitle: {
			type: String,
			required: true,
		},
		blogContent: {
			type: String,
			required: true,
		},
		blogImage: {
			type: String,
			required: true,
		},
		
		blogRelatedLinks: [
			{
				relatedBlogId: {
					type: String,
					required: true,
					validate: {
						validator: relatedBlogHandler,
						message: "Invalid Input (No related blog found.)",
					},
				},
				relatedBlogTitle: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("blog-images", blogSchema);

module.exports = Blog;
