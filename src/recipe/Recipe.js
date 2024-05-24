// Recipe.js
function createRecipe({
  name,
  ingredients,
  description,
  instructions,
  cuisine,
  prepTime,
  servings,
  isVegan=false,
  isVegetarian=false,
  image='https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png',
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