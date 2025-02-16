import { API_URL } from "./config.js";
import { getFetch, convertKeysToCamelCaseDeep } from "./helper.js";

export const state = {
	recipe: {},
	search: {
		query: "",
		result: [],
	},
};

export const loadRecipe = async function (id) {
	try {
		const data = await getFetch(`${API_URL}/${id}`);
		state.recipe = convertKeysToCamelCaseDeep(data.data.recipe);
	} catch (err) {
		throw err;
	}
};

export const loadSearchResult = async function (query) {
	try {
		state.search.query = "query";
		const data = await getFetch(`${API_URL}?search=${query}`);

		state.search.result = data.data.recipes.map((recipe) => convertKeysToCamelCaseDeep(recipe));
	} catch (err) {
		throw err;
	}
};
