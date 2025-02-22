import { TIMEOUT_SEC } from "./config.js";

// to limit api call duration
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// Getting API Data
export async function getFetch(url) {
	try {
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		const data = await res.json();

		if (!res.ok) throw new Error(data.message);
		return data;
	} catch (err) {
		throw err;
	}
}

// Posting Data to API
export async function sendFetch(url, uploadData) {
	try {
		const res = await Promise.race([
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(uploadData),
			}),
			timeout(TIMEOUT_SEC),
		]);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
}

// Change API object's key name to CamelCase
function toCamelCase(str) {
	return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
export function convertKeysToCamelCaseDeep(obj) {
	if (Array.isArray(obj)) {
		return obj.map(convertKeysToCamelCaseDeep);
	} else if (typeof obj === "object" && obj !== null) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				toCamelCase(key),
				convertKeysToCamelCaseDeep(value), // Recursive call
			])
		);
	}
	return obj;
}
