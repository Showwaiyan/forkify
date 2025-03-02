import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { convertKeysToCamelCaseDeep, AJAX } from "./helper.js";

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
		const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
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
		const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

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

export const uploadRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter((el) => el[0].startsWith("ingredient") && el[1] !== "")
			.reduce((acc, [key, value]) => {
				const [, number, prop] = key.split("-");

				const index = Number(number) - 1;
				if (!acc[index]) acc[index] = { quantity: "", unit: "", description: "" };

				acc[index][prop] = isFinite(value) ? +value : value === "" ? null : value.trim();
				return acc;
			}, []);

		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		};
		const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
		state.recipe = convertKeysToCamelCaseDeep(data.data.recipe);
		addBookmark(state.recipe);
	} catch (err) {
		throw err;
	}
};

const init = function () {
	const storage = localStorage.getItem("bookmarks");
	if (storage) state.bookmarks = JSON.parse(storage);
};
init();
