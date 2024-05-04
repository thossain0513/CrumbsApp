// Recipe.js
function createRecipe({
  name,
  ingredients,
  instructions,
  cookingTime,
  servings,
}) {
  return {
    name,
    ingredients,
    instructions,
    cookingTime,
    servings,
  };
}

export default createRecipe;