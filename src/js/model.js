import { API_URL } from "./config.js";
import { getFetch, convertKeysToCamelCaseDeep } from "./helper.js";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getFetch(`${API_URL}/${id}`);
    state.recipe = convertKeysToCamelCaseDeep(data.data.recipe);
  } catch (err) {
    alert(err.message);
  }
};
