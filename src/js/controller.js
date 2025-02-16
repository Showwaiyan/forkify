import * as model from "./model.js";
import recipeView from "./Views/recipeView.js";
import searchView from "./Views/searchView.js";
import resultsView from "./Views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// For Api data to be fromatted
const controlRecipe = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;

		recipeView.renderSpinner();

		// Loading recipe
		await model.loadRecipe(id);
		const { recipe } = model.state;
		// Rendering recipe
		recipeView.render(recipe);
	} catch (err) {
		recipeView.renderErrorMessage();
	}
};

const controlSearchRecipes = async function () {
	try {
		resultsView.renderSpinner();

		const query = searchView.getQuery();
		await model.loadSearchResult(query);
		resultsView.render(model.state.search.result);
	} catch (err) {
		alert(err);
	}
};

const init = function () {
	recipeView.addHandlerRender(["hashchange", "load"], controlRecipe, window);
	searchView.addHandlerRender(["submit"], controlSearchRecipes);
};
init();
