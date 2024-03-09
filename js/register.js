import { REGISTER_URL } from "./constant.js";
import { doFetch } from ".fetch.js";

const registrationForm = document.querySelector("#registrationForm");

/**
 * Adds an event listener to the registration form to handle the submit event.
 * Prevents the default form submission and extracts user input from the form fields
 * to pass to the registerUser function for user registration.
 */

registrationForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(event);
	const name = event.target[0].value;
	const email = event.target[1].value;
	const password = event.target[2].value;
	registerUser(name, email, password);
});

/**
 * Registers a new user by sending a POST request to the registration URL with user's name, email, and password.
 * On success, displays a success message and redirects the user to the homepage after 2 seconds.
 * On failure, displays an error message.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 * @returns {Promise<void>} A promise that resolves with no value when the registration is successful, or rejects with an error message if the registration fails.
 */

async function registerUser(name, email, password) {
	try {
		await doFetch(REGISTER_URL, false, {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
		});
		// Oppdaterer meldingen med suksessinformasjon
		const registrationMessage = document.querySelector("#registrationMessage");
		registrationMessage.innerHTML = '<p class="text-success">Registration successful! Redirecting...</p>';

		// Omdiriger brukeren
		setTimeout(() => {
			window.location.href = "../feed/index.html";
		}, 2000); // Vent i 2 sekunder før omdirigering
	} catch (error) {
		// Viser en feilmelding dersom registreringen feiler
		const registrationMessage = document.querySelector("#registrationMessage");
		registrationMessage.innerHTML = '<p class="text-danger">Registration failed. Please try again.</p>';
		console.error("Registration error:", error);
	}
}
