export const state = {
    recipe: {}
};

export const loadRecipe = async function(id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const recipeData = await res.json().then((data)=>data.data.recipe);

        if (!res.ok) throw new Error(data.message);
        state.recipe = convertKeysToCamelCaseDeep(recipeData);

    } catch (err) {
        alert(err.message);
    }
};

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
