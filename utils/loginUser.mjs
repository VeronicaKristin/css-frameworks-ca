import { LOGIN_URL } from "./constant.mjs";
import { doFetch } from "./doFetch.mjs";
import { addAuthToken } from "./handleAuth.mjs";

export async function loginUser(email, password) {
	const response = await doFetch(LOGIN_URL, {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
	});
	const accessToken = response.accessToken;
	if (accessToken) {
		addAuthToken(accessToken);
	} else {
		throw new Error("No access token provided");
	}
}
