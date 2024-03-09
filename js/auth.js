/**
 * Saves the provided authentication token to localStorage.
 * This token is typically used for subsequent API requests that require authentication.
 *
 * @param {string} token - The authentication token to be stored.
 */

export const addAuthToken = (token) => {
	console.log("Add token", token);
	localStorage.setItem("access-token", token);
};

/**
 * Retrieves the authentication token from localStorage.
 * This token is used for making authenticated API requests.
 *
 * @returns {string|null} Returns the stored authentication token if it exists, otherwise null.
 */

export const getAuthToken = () => {
	const accessToken = localStorage.getItem("access-token");
	console.log(accessToken);
	return accessToken;
};
