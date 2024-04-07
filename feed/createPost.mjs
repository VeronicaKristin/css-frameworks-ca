import { POST_URL } from "../utils/constant.mjs";
import { doFetch } from "../utils/doFetch.mjs";

document.addEventListener("DOMContentLoaded", () => {
	const postButton = document.getElementById("postButton");

	postButton.addEventListener("click", async () => {
		const title = document.getElementById("postTitle").value;
		const content = document.getElementById("postContent").value;
		const imageUrl = document.getElementById("postImage").value;

		// Validate required fields
		if (!title || !content || !imageUrl) {
			alert("Please fill out all fields.");
			return;
		}

		const postData = {
			title: title,
			body: content,
			media: imageUrl,
		};

		try {
			const response = await doFetch(POST_URL, true, {
				method: "POST",
				body: JSON.stringify(postData),
			});

			console.log(response);
			if (response.ok) {
				const responseData = await response.json();
				alert("Post created successfully!");
				// Optionally clear form fields or perform other actions
				document.getElementById("postTitle").value = "";
				document.getElementById("postContent").value = "";
				document.getElementById("postImage").value = "";
			} else {
				throw new Error("Failed to create post");
			}
		} catch (error) {
			console.error("Error creating post:", error);
			alert("Failed to create post. Please try again.");
		}
	});
});
