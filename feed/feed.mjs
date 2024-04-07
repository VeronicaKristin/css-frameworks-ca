// get posts
//display posts

import { POST_URL } from "../utils/constant.mjs";
import { doFetch } from "../utils/doFetch.mjs";
import { DELETE_POST } from "../utils/constant.mjs";

const generateSinglePostHtml = (post) => {
	const postContainer = document.createElement("div");
	postContainer.classList.add("card-body", "col", "card", "h-100", "mx-2");

	const postMedia = document.createElement("img");
	postMedia.src = post.media || "https://place-hold.it/300x300";
	postMedia.classList.add("card-img-top");
	postMedia.alt = post.title + " Image ";

	const postTitle = document.createElement("h3");
	postTitle.textContent = post.title;
	postTitle.classList.add("card-title");

	const postBody = document.createElement("p");
	postBody.textContent = post.body;
	postBody.classList.add("card-text");

	const viewButton = document.createElement("button");
	viewButton.textContent = "View";
	viewButton.classList.add("btn", "btn-outline-info", "mt-2");
	viewButton.onclick = () => openPostModal(post);

	postContainer.append(postMedia, postTitle, postBody, viewButton);

	return postContainer;
};

const openPostModal = (post) => {
	const modal = createPostModal(post);
	document.body.appendChild(modal);
};

const createPostModal = (post) => {
	const modal = document.createElement("div");
	modal.classList.add("modal", "fade");
	modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${post.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${post.media}" class="img-fluid mb-3" />
                    <p>${post.body}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-info" id="editButton">Edit</button>
                    <button type="button" class="btn btn-outline-danger" id="deleteButton">Delete</button>
                </div>
            </div>
        </div>
    `;

	// Initialize event listeners for edit and delete buttons
	const editButton = modal.querySelector("#editButton");
	const deleteButton = modal.querySelector("#deleteButton");

	editButton.addEventListener("click", () => handleEditPost(post));
	deleteButton.addEventListener("click", () => handleDeletePost(post));

	// Bootstrap modal initialization
	new bootstrap.Modal(modal).show();

	return modal;
};

const handleEditPost = async (postId) => {
	try {
		// Fetch post data from the API using a custom fetch function (doFetch)
		const response = await doFetch(DELETE_POST + postId.id, true, {
			method: "GET",
		});

		if (!response) {
			throw new Error("Failed to fetch post data");
		}

		// Display a form/modal populated with post data
		const updatedPost = prompt("Edit the post:", response.body);

		if (updatedPost !== null) {
			// Update the post with edited data
			const editResponse = await doFetch(DELETE_POST + postId.id, true, {
				method: "PUT",

				body: JSON.stringify({
					...response,
					body: updatedPost,
				}),
			});

			if (editResponse) {
				console.log("Post updated successfully");
			} else {
				throw new Error("Failed to update post");
			}
		} else {
			console.log("Edit canceled");
		}
	} catch (error) {
		console.error("Error editing post:", error.message);
	}
};

const handleDeletePost = (postId) => {
	if (confirm("Are you sure you want to delete this post?")) {
		doFetch(DELETE_POST + postId.id, true, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response) {
					throw new Error(`Failed to delete post (status ${response.status})`);
				}
				console.log(`Post with ID ${postId} has been successfully deleted`);
			})
			.catch((error) => {
				console.error("Error deleting post:", error);
			});
	} else {
		console.log("Deletion cancelled");
	}
};

export async function displayPosts(extra = "") {
	const postsDisplayContainer = document.querySelector("#post-display-container");
	postsDisplayContainer.textContent = "";

	try {
		const posts = await doFetch(POST_URL + extra, true);

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
