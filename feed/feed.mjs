// get posts
//display posts

import { POST_URL } from "../utils/constant.mjs";
import { doFetch } from "../utils/doFetch.mjs";

const generateSinglePostHtml = (post) => {
	const postContainer = document.createElement("div");
	postContainer.classList.add("card-body", "col", "card", "h-100", "mx-2");

	const postMedia = document.createElement("img");
	postMedia.src = post.media;
	postMedia.classList.add("card-img-top");

	const postTitle = document.createElement("h3");
	postTitle.textContent = post.title;
	postTitle.classList.add("card-title");

	const postBody = document.createElement("p");
	postBody.textContent = post.body;
	postBody.classList.add("card-text");

	postContainer.append(postMedia, postTitle, postBody);

	return postContainer;
};

async function displayPosts() {
	const postsDisplayContainer = document.querySelector("#post-display-container");
	postsDisplayContainer.textContent = "";

	try {
		const posts = await doFetch(POST_URL, true);

		posts.forEach((post, index) => {
			const postHtml = generateSinglePostHtml(post);
			postsDisplayContainer.appendChild(postHtml);
		});
	} catch (error) {
		console.error("Error fetching posts:", error);
	}
}

async function main() {
	await displayPosts();
}

main();
