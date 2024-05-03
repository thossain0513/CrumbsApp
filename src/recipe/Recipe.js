// Recipe.js
export default class Recipe {
    constructor({
      name,
      ingredients,
      instructions,
      cookingTime,
      servings,
    }) {
      this.name = name;
      this.ingredients = ingredients;
      this.instructions = instructions;
      this.cookingTime = cookingTime;
      this.servings = servings;
    }
  }