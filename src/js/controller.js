import * as model from "./model.js";
import recipeView from "./Views/recipeView.js";
import searchView from "./Views/searchView.js";
import resultsView from "./Views/resultsView.js";
import paginationView from "./Views/paginationView.js";

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
		resultsView.render(model.getSearchResultPerPage());
		paginationView.render(model.state.search);
	} catch (err) {
		alert(err);
	}
};

const controlPaginatino = function (goToPage) {
	resultsView.render(model.getSearchResultPerPage(goToPage));
	paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
	model.updateServing(newServing);

	recipeView.render(model.state.recipe);
};

const init = function () {
	recipeView.addHandlerEvents(["hashchange", "load"], controlRecipe, window);
	recipeView.addHandlerServing(controlServing);
	searchView.addHandlerEvents(["submit"], controlSearchRecipes);
	paginationView.addHandlerEvents(["click"], controlPaginatino);
};
init();
