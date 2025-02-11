const recipeContainer = document.querySelector('.recipe');

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
function toCamelCase(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function convertKeysToCamelCaseDeep(obj) {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamelCaseDeep);
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                toCamelCase(key),
                convertKeysToCamelCaseDeep(value) // Recursive call
            ])
        );
    }
    return obj;
}



const showRecipe = async function() {
    try {
        const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await res.json();
        let recipe = convertKeysToCamelCaseDeep(data.data.recipe);

        if (!res.ok) throw new Error(data.message);

    } catch (err) {
        alert(err);
    }
}
showRecipe();
