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
	bookmarks: [],
};

export const loadRecipe = async function (id) {
	try {
		const data = await getFetch(`${API_URL}/${id}`);
		state.recipe = convertKeysToCamelCaseDeep(data.data.recipe);

		// load bookmark
		if (state.bookmarks.some((recipe) => recipe.id === state.recipe.id)) {
			state.recipe.bookmarked = true;
		}
	} catch (err) {
		throw err;
	}
};

export const loadSearchResult = async function (query) {
	try {
		state.search.query = "query";
		const data = await getFetch(`${API_URL}?search=${query}`);

		state.search.result = data.data.recipes.map((recipe) => convertKeysToCamelCaseDeep(recipe));

		// reset the page
		state.search.page = 1;
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

export const updateServing = function (newServing) {
	state.recipe.ingredients.forEach((ing) => {
		ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
	});
	state.recipe.servings = newServing;
};

const persistBookmark = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
	state.bookmarks.push(recipe);

	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

	persistBookmark();
};

export const removeBookmark = function (id) {
	const index = state.bookmarks.findIndex((recipe) => recipe.id === id);

	state.bookmarks.splice(index, 1);

	if (id === state.recipe.id) state.recipe.bookmarked = false;

	persistBookmark();
};

const init = function () {
	const storage = localStorage.getItem("bookmarks");
	if (storage) state.bookmarks = JSON.parse(storage);
};
init();
