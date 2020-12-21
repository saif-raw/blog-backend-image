const mongoose = require("mongoose");

async function relatedBlogHandler() {
	return await mongoose.model("blog-images").exists({
		blogId: this.relatedBlogId,
	});
}

module.exports = relatedBlogHandler;
