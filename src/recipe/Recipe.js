// Recipe.js
function createRecipe({
  name,
  ingredients,
  description,
  instructions,
  cuisine,
  prepTime,
  servings,
  image=null,
}) {
  return {
    name,
    ingredients,
    description,
    instructions,
    cuisine,
    prepTime,
    servings,
    image
  };
}

export default createRecipe;