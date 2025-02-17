import { API_URL, RES_PER_PAGE } from "./config.js";
import { getFetch, convertKeysToCamelCaseDeep } from "./helper.js";

export const state = {
	recipe: {},
	search: {
		query: "",
		result: [],
		resultPerPage: RES_PER_PAGE,
		page: 1,
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

export const getSearchResultPerPage = function (page = state.search.page) {
	state.search.page = page;

	const start = (page - 1) * state.search.resultPerPage;
	const end = page * state.search.resultPerPage;

	return state.search.result.slice(start, end);
};
