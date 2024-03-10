import { loginUser } from "../utils/loginUser.mjs";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(event);
	const name = event.target[0].value;
	const email = event.target[1].value;
	const password = event.target[2].value;
	loginUser(name, email, password);
});
