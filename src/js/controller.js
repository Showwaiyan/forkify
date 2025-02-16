import * as model from "./model.js";
import recipeView from "./Views/recipeView.js";

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

(function () {
	recipeView.addHandlerRender(["hash", "load"], window, controlRecipe);
})();
