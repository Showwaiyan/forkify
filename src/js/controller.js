import * as model from "./model.js";
import recipeView from "./Views/recipeView.js";
import searchView from "./Views/searchView.js";
import resultsView from "./Views/resultsView.js";
import PaginationView from "./Views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import paginationView from "./Views/paginationView.js";

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

const init = function () {
	recipeView.addHandlerEvents(["hashchange", "load"], controlRecipe, window);
	searchView.addHandlerEvents(["submit"], controlSearchRecipes);
	paginationView.addHandlerEvents(["click"], controlPaginatino);
};
init();
