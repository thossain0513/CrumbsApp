import createRecipe from './Recipe'

export const chickenParmesan = createRecipe({
name: 'Chicken Parmesan',
ingredients: ['chicken breasts', 'tomato sauce', 'mozzarella cheese', 'basil'],
description: "Bro it's just a chicken parmesan",
instructions: [
    'Preheat oven to 400°F', 
    'Bread chicken with breadcrumbs', 
    'Bake for 20 minutes'],
cuisine: 'American',
prepTime: "30 minutes",
servings: 4,
tags: ['meat', 'easy', 'quick']
});

export const grilledCheese = createRecipe({
    name: 'Grilled Cheese',
    description: "bro it's just a grilled cheese",
    ingredients: ['bread', 'cheese'],
    instructions: [
        'Butter bread', 
        'Place cheese', 
        'Grill until golden'],
    cuisine: 'American',
    prepTime: '5 minutes',
    servings: 1,
    tags: ['meat', 'easy', 'quick']
});

export const chickenFajitas = createRecipe({
    name: 'Chicken Fajitas',
    ingredients: ['chicken breasts', 'bell peppers', 'onions', 'tortillas'],
    description: "Bro it's just chicken fajitas",
    instructions: [
      'Marinate chicken',
      'Saute onions and bell peppers',
      'Cook chicken',
      'Serve with tortillas'
    ],
    cuisine: 'Mexican',
    prepTime: '30 Minutes',
    servings: 4,
    tags: ['meat', 'easy', 'quick']
  });

  export const roastedVegetables = createRecipe({
    name: 'Roasted Vegetables',
    ingredients: ['carrots', 'broccoli', 'sweet potatoes'],
    description: "Bro it's just roasted vegetables",
    instructions: ['Toss with oil and seasoning', 'Roast in oven'],
    cuisine: "White People Food",
    prepTime: "25 minutes",
    servings: 6,
    tags: ['meat', 'easy', 'quick']
  });

  export const chocolateCake = createRecipe({
    name: 'Chocolate Cake',
    description: "Bro it's just chocolate cake",
    ingredients: ['flour', 'sugar', 'eggs', 'chocolate'],
    instructions: [
      'Preheat oven',
      'Mix ingredients',
      'Bake until done'
    ],
    cuisine: "Dessert",
    prepTime: "35 minutes",
    servings: 8,
    tags: ['meat', 'easy', 'quick']
  });

  export const chickenTikkaMasala = createRecipe({
    name: 'Chicken Tikka Masala',
    description: "Bro it's just indian food",
    ingredients: ['chicken breasts', 'yogurt', 'spices', 'basmati rice'],
    instructions: [
      'Marinate chicken',
      'Cook in sauce',
      'Serve with rice'
    ],
    cuisine: "Indian",
    prepTime: "30 minutes",
    servings: 6,
    tags: ['meat', 'easy', 'quick']
  });