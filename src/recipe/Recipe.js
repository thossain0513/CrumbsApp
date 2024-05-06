// Recipe.js
function createRecipe({
  name,
  ingredients,
  instructions,
  cookingTime,
  servings,
  url=null,
}) {
  return {
    name,
    ingredients,
    instructions,
    cookingTime,
    servings,
    url
  };
}

export default createRecipe;