document.addEventListener("DOMContentLoaded", () => {
	const postTitleInput = document.getElementById("postTitle");
	const postContentInput = document.getElementById("postContent");
	const formFileInput = document.getElementById("postImage");
	const closeModalBtn = document.querySelector('[data-bs-dismiss="modal"]');
	const postButton = document.getElementById("postButton");

	closeModalBtn.addEventListener("click", () => {
		// Clear form fields when Close button is clicked
		postTitleInput.value = "";
		postContentInput.value = "";
		formFileInput.value = "";
	});

	postButton.addEventListener("click", () => {
		// Clear form fields when Post button is clicked
		postTitleInput.value = "";
		postContentInput.value = "";
		formFileInput.value = "";
	});
});
