import * as model from './model.js';
import recipeView from "./Views/recipeView.js";

import "core-js/stable"
import "regenerator-runtime/runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// For Api data to be fromatted
const controlRecipe = async function() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        // Loading recipe
        await model.loadRecipe(id);
        const {recipe} = model.state;
        // Rendering recipe
        recipeView.render(recipe);
    } catch (err) {
        alert(err);
    }
};

['hashchange','load'].forEach(ev => window.addEventListener(ev,controlRecipe));
