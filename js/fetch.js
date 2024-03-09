import { getAuthToken } from "./auth.js";

/**
 * Performs a fetch request to the specified URL with optional authentication and custom options.
 * This function automatically applies JSON content type to the headers and, if authentication
 * is needed, it includes the Authorization header with a Bearer token obtained from `getAuthToken`.
 * Any additional options specified will be merged with the headers.
 *
 * @async
 * @param {string} url - The URL to which the request will be sent.
 * @param {boolean} [isAuth=false] - A flag indicating whether the request requires authentication.
 * If true, the Authorization header will be added with the bearer token.
 * @param {Object} [options={}] - Additional options for the fetch request, such as method, body, etc.
 * These options will be merged with the default headers.
 * @returns {Promise<Object>} A promise that resolves with the JSON response body from the server.
 * @throws Will throw an error if the fetch request fails or if the server response cannot be parsed as JSON.
 */

export async function doFetch(url, isAuth = false, options = {}) {
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		if (isAuth) {
			const authToken = getAuthToken();
			headers["Authorization"] = `Bearer ${authToken}`;
		}

		const combinedOptions = { headers, ...options };
		console.log(combinedOptions);

		const response = await fetch(url, combinedOptions);
		console.log(response);

		console.log("Status code:", response.status);

		const json = await response.json();
		return json;
	} catch (error) {
		console.log(error);
		throw error;
	} finally {
		//
	}
}
