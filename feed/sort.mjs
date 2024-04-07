document.addEventListener("DOMContentLoaded", function () {
	const sortSelect = document.getElementById("sortSelect");

	let posts = []; // Array to store fetched posts

	// Function to fetch posts from API (replace 'fetchPostsFromAPI' with your API fetching logic)
	function fetchPostsFromAPI() {
		fetch("${BASE_URL}/social/posts") // Replace with your API endpoint
			.then((response) => response.json())
			.then((data) => {
				posts = data.posts; // Assuming API response contains a 'posts' array
				renderPosts(posts); // Render posts initially
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			});
	}

	// Function to render posts
	function renderPosts(postsArray) {
		const postDisplayContainer = document.getElementById("post-display-container");
		postDisplayContainer.innerHTML = ""; // Clear existing posts

		postsArray.forEach((post) => {
			const postElement = document.createElement("div");
			postElement.classList.add("post");
			postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>Date: ${post.date}</p>
                <p>${post.content}</p>
            `;
			postDisplayContainer.appendChild(postElement);
		});
	}

	// Event listener for sorting posts
	sortSelect.addEventListener("change", function () {
		const selectedOption = parseInt(sortSelect.value);

		if (selectedOption === 1) {
			// Sort by newest (assuming 'date' field is in ISO 8601 format)
			posts.sort((a, b) => new Date(b.date) - new Date(a.date));
		} else if (selectedOption === 2) {
			// Sort by oldest
			posts.sort((a, b) => new Date(a.date) - new Date(b.date));
		}

		renderPosts(posts); // Re-render posts after sorting
	});

	// Fetch posts from API and initialize sorting
	fetchPostsFromAPI();
});
