// get posts
//display posts

import { POST_URL } from "../utils/constant.mjs";
import { doFetch } from "../utils/doFetch.mjs";

async function getPosts() {
	console.log("getting posts");
	const posts = doFetch(POST_URL, true);
	console.log(posts);
}

function main() {
	getPosts();
}
main();
