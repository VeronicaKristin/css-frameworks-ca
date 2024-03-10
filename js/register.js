import { REGISTER_URL } from "./constant.js";
import { doFetch } from ".fetch.js";

const registrationForm = document.querySelector("#registrationForm");

registrationForm.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(event);
	const name = event.target[0].value;
	const email = event.target[1].value;
	const password = event.target[2].value;
	registerUser(name, email, password);
});

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
