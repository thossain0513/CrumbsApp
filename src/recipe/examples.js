import { Recipe } from './recipe'

export const chickenParmesan = new Recipe({
name: 'Chicken Parmesan',
ingredients: ['chicken breasts', 'tomato sauce', 'mozzarella cheese', 'basil'],
instructions: [
    'Preheat oven to 400°F', 
    'Bread chicken with breadcrumbs', 
    'Bake for 20 minutes'],
cookingTime: 30,
servings: 4
});

export const grilledCheese = new Recipe({
    name: 'Grilled Cheese',
    ingredients: ['bread', 'cheese'],
    instructions: [
        'Butter bread', 
        'Place cheese', 
        'Grill until golden'],
    cookingTime: 5,
    servings: 1
});

export const complexRecipe = new Recipe({
    name: 'Chicken Fajitas',
    ingredients: ['chicken breasts', 'bell peppers', 'onions', 'tortillas'],
    instructions: [
      'Marinate chicken',
      'Saute onions and bell peppers',
      'Cook chicken',
      'Serve with tortillas'
    ],
    cookingTime: 30,
    servings: 4
  });

  export const veggieRecipe = new Recipe({
    name: 'Roasted Vegetables',
    ingredients: ['carrots', 'broccoli', 'sweet potatoes'],
    instructions: ['Toss with oil and seasoning', 'Roast in oven'],
    cookingTime: 25,
    servings: 6
  });

  export const dessertRecipe = new Recipe({
    name: 'Chocolate Cake',
    ingredients: ['flour', 'sugar', 'eggs', 'chocolate'],
    instructions: [
      'Preheat oven',
      'Mix ingredients',
      'Bake until done'
    ],
    cookingTime: 35,
    servings: 8
  });

  export const internationalRecipe = new Recipe({
    name: 'Chicken Tikka Masala',
    ingredients: ['chicken breasts', 'yogurt', 'spices', 'basmati rice'],
    instructions: [
      'Marinate chicken',
      'Cook in sauce',
      'Serve with rice'
    ],
    cookingTime: 40,
    servings: 6
  });