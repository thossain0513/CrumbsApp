import createRecipe from './Recipe'

export const chickenParmesan = createRecipe({
name: 'Chicken Parmesan',
ingredients: ['chicken breasts', 'tomato sauce', 'mozzarella cheese', 'basil'],
instructions: [
    'Preheat oven to 400°F', 
    'Bread chicken with breadcrumbs', 
    'Bake for 20 minutes'],
cuisine: 'American',
prepTime: "30 minutes",
servings: 4
});

export const grilledCheese = createRecipe({
    name: 'Grilled Cheese',
    ingredients: ['bread', 'cheese'],
    instructions: [
        'Butter bread', 
        'Place cheese', 
        'Grill until golden'],
    cuisine: 'American',
    prepTime: '5 minutes',
    servings: 1
});

export const chickenFajitas = createRecipe({
    name: 'Chicken Fajitas',
    ingredients: ['chicken breasts', 'bell peppers', 'onions', 'tortillas'],
    instructions: [
      'Marinate chicken',
      'Saute onions and bell peppers',
      'Cook chicken',
      'Serve with tortillas'
    ],
    cuisine: 'Mexican',
    prepTime: '30 Minutes',
    servings: 4
  });

  export const roastedVegetables = createRecipe({
    name: 'Roasted Vegetables',
    ingredients: ['carrots', 'broccoli', 'sweet potatoes'],
    instructions: ['Toss with oil and seasoning', 'Roast in oven'],
    cuisine: "White People Food",
    prepTime: "25 minutes",
    servings: 6
  });

  export const chocolateCake = createRecipe({
    name: 'Chocolate Cake',
    ingredients: ['flour', 'sugar', 'eggs', 'chocolate'],
    instructions: [
      'Preheat oven',
      'Mix ingredients',
      'Bake until done'
    ],
    cuisine: "Dessert",
    prepTime: "35 minutes",
    servings: 8
  });

  export const chickenTikkaMasala = createRecipe({
    name: 'Chicken Tikka Masala',
    ingredients: ['chicken breasts', 'yogurt', 'spices', 'basmati rice'],
    instructions: [
      'Marinate chicken',
      'Cook in sauce',
      'Serve with rice'
    ],
    cuisine: "Indian",
    prepTime: "30 minutes",
    servings: 6
  });