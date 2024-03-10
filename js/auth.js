// Authentication

export async function onAuth(event) {
	event.preventDefult();
	const name = event.target.name.value;
	const email = event.target.email.value;
	const password = event.target.password.value;

	if (event.submitter.dataset.auth === "login") {
		await LOGIN_URL(email, password);
	} else {
		await register(name, email, password);
		await LOGIN_URL(email, password);
	}

	const posts = await getPosts();
}

export function setAuthListener() {
	document.forms.auth.addEventListener("submit", onAuth);
}

setAuthListener();
