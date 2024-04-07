import { displayPosts } from "./feed.mjs";

document.addEventListener("DOMContentLoaded", function () {
	const searchForm = document.getElementById("search");
	searchForm.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent default form submission
		const searchInput = document.getElementById("tags");
		const searchTag = searchInput.value;
		// Get the search input value (tag)

		displayPosts("?_tag=" + searchTag);
	});
});
