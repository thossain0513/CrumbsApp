# tests/test_generate_recipe.py

import pytest
from flask import Flask
from app import app  # Import your Flask app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_generate_recipe(client):
    ingredients = ["tomato", "basil", "mozzarella"]
    data = {
        "ingredients": ingredients,
        "num_recipes": 1,
        "is_vegetarian": True,
        "is_vegan": False
    }
    response = client.post('/generate_recipe', json=data)
    assert response.status_code == 200

    recipes = response.json()
    assert len(recipes) == 1
    recipe = recipes[0]

    assert 'name' in recipe
    assert 'ingredients' in recipe
    assert 'description' in recipe
    assert 'instructions' in recipe
    assert 'cuisine' in recipe
    assert 'prepTime' in recipe
    assert 'servings' in recipe
    assert 'is_vegetarian' in recipe
    assert 'is_vegan' in recipe

    assert recipe['is_vegetarian'] == "Yes"
    assert recipe['is_vegan'] == "No"

def test_generate_recipe_invalid_data(client):
    data = {
        "ingredients": [],
        "num_recipes": 1
    }
    response = client.post('/generate_recipe', json=data)
    assert response.status_code == 400  # Assuming your API returns a 400 status for bad requests

def test_generate_recipe_multiple_recipes(client):
    ingredients = ["chicken", "rice", "broccoli"]
    data = {
        "ingredients": ingredients,
        "num_recipes": 3,
        "is_vegetarian": False,
        "is_vegan": False
    }
    response = client.post('/generate_recipe', json=data)
    assert response.status_code == 200

    recipes = response.json()
    assert len(recipes) == 3
    for recipe in recipes:
        assert 'name' in recipe
        assert 'ingredients' in recipe
        assert 'description' in recipe
        assert 'instructions' in recipe
        assert 'cuisine' in recipe
        assert 'prepTime' in recipe
        assert 'servings' in recipe
        assert 'is_vegetarian' in recipe
        assert 'is_vegan' in recipe
