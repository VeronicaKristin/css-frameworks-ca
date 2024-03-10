// Create post

import { POST_URL } from "../utils/constant.mjs";

document.addEventListener("DOMContentLoaded", function () {
	const doFetch = async (url, options) => {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw new Error(`Fetch error: ${error.message}`);
		}
	};

	const createPost = async (title, body, image) => {
		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("body", body);
			formData.append("image", image);

			await doFetch(POST_URL, {
				method: "POST",
				body: formData,
			});

			await displayPosts();
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	document.getElementById("postButton").addEventListener("click", async function () {
		const title = document.getElementById("titleInput").value;
		const body = document.getElementById("bodyInput").value;
		const image = document.getElementById("imageInput").files[0];

		try {
			await createPost(title, body, image);
		} catch (error) {
			console.error("Error posting:", error);
		}
	});
});
