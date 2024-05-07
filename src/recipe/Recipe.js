// Recipe.js
function createRecipe({
  name,
  ingredients,
  instructions,
  cuisine,
  prepTime,
  servings,
  image=null,
}) {
  return {
    name,
    ingredients,
    instructions,
    cuisine,
    prepTime,
    servings,
    image
  };
}

export default createRecipe;