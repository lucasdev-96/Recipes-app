import React, { useEffect, useState } from 'react';
import { element } from 'prop-types';

import RecipesContext from './RecipesContext';
import { fetchCategories, fetchRecipes } from '../services/theMealAPI';

import {
  DRINKS_CATEGORIES_ENDPOINT,
  DRINKS_RECIPES_ENDPOINT,
  FOODS_CATEGORIES_ENDPOINT,
  FOODS_RECIPES_ENDPOINT,
} from '../helpers/endpoints';
import useLocalStorage from '../hooks/useLocalStorage';

export default function RecipesProvider({ children }) {
  const { getFavoriteRecipes, getDoneRecipes } = useLocalStorage();

  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [foodOrDrinksPathName, setfoodOrDrinksPathName] = useState('');
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [foodDetailRecipes, setFoodDetailRecipes] = useState([]);
  const [drinkdetailRecipes, setdrinkDetailRecipes] = useState([]);
  const [changeBtn, setChangeBtn] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState(getDoneRecipes());
  const [ingredientsFood, setIngredientsFood] = useState([]);
  const [ingredientsDrink, setIngredientsDrink] = useState([]);

  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {},
    meals: {},
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState(getFavoriteRecipes());

  const addNewInProgressMealsRecipes = (id, ingredient) => {
    setInProgressRecipes((prevState) => {
      const mealsPrevState = prevState.meals[id] ? prevState.meals[id] : [];

      return {
        ...prevState,
        meals: {
          ...prevState.meals,
          [id]: [
            ...mealsPrevState,
            ingredient,
          ],
        },
      };
    });
  };

  const addNewInProgressCocktailsRecipes = (id, ingredient) => {
    setInProgressRecipes((prevState) => {
      const cocktailsPrevState = prevState.cocktails[id] ? prevState.cocktails[id] : [];

      return {
        ...prevState,
        cocktails: {
          ...prevState.cocktails,
          [id]: [
            ...cocktailsPrevState,
            ingredient,
          ],
        },
      };
    });
  };

  const getInProgressRecipeStorage = () => {
    const storage = localStorage.getItem('inProgressRecipes');
    if (storage) setInProgressRecipes(JSON.parse(storage));
  };

  const context = {
    categories: {
      foods: foodsCategories,
      drinks: drinksCategories,
    },
    recipes: {
      foods: foodsRecipes,
      drinks: drinksRecipes,
    },
    detailRecipes: {
      foods: foodDetailRecipes,
      drinks: drinkdetailRecipes,
    },
    ingredients: {
      foods: ingredientsFood,
      drinks: ingredientsDrink,
    },
    inProgressRecipes,
    setFoodsRecipes,
    setDrinksRecipes,
    foodsRecipes,
    drinksRecipes,
    addNewInProgressMealsRecipes,
    addNewInProgressCocktailsRecipes,
    foodOrDrinksPathName,
    setfoodOrDrinksPathName,
    setFoodDetailRecipes,
    setdrinkDetailRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    changeBtn,
    setChangeBtn,
    doneRecipes,
    setDoneRecipes,
    setIngredientsFood,
    setIngredientsDrink,
  };

  useEffect(() => {
    const setFoodsAndDrinks = async () => {
      setFoodsCategories(await fetchCategories(FOODS_CATEGORIES_ENDPOINT));
      setDrinksCategories(await fetchCategories(DRINKS_CATEGORIES_ENDPOINT));

      setFoodsRecipes(await fetchRecipes(FOODS_RECIPES_ENDPOINT));
      setDrinksRecipes(await fetchRecipes(DRINKS_RECIPES_ENDPOINT));
    };

    setFoodsAndDrinks();
    getInProgressRecipeStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  return (
    <RecipesContext.Provider value={ { ...context } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: element,
}.isRequired;
