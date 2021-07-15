import React, { useContext, useState, useEffect } from 'react';
import { useHistory,
  useRouteMatch } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import { fetchRecipes } from '../services/theMealAPI';
// import '../styles/mapDetails.css';
import '../styles/ExploreIngredients.css';

function ExploreFoodOrDrink() {
  const { ingredients,
    setFoodsRecipes,
    setDrinksRecipes,
  } = useContext(RecipesContext);
  const [keyName, setKeyName] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [urlImageName, setUrlImageName] = useState('');

  const { url } = useRouteMatch();
  const [routeName, setRouteName] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (url.includes('comidas')) {
      setKeyName('foods');
      setIngredientName('strIngredient');
      setUrlImageName('themealdb');
      setRouteName('/comidas');
    }
    if (url.includes('bebidas')) {
      setKeyName('drinks');
      setIngredientName('strIngredient1');
      setUrlImageName('thecocktaildb');
      setRouteName('/bebidas');
    }
  }, []);

  const filterIngredientFn = async (name) => {
    const filterByIngredients = await fetchRecipes(`https://www.${urlImageName}.com/api/json/v1/1/filter.php?i=${name}`);
    if (routeName === '/comidas') setFoodsRecipes(filterByIngredients);
    if (routeName === '/bebidas') setDrinksRecipes(filterByIngredients);
    history.push(routeName);
  };

  return (
    <>
      {ingredients[keyName] ? ingredients[keyName].map((value, index) => {
        const src = `https://www.${urlImageName}.com/images/ingredients/${value[ingredientName]}-Small.png`;
        return (
          <div
            className="explore-ingredients-container"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
          >
            <button
              onClick={ () => {
                filterIngredientFn(value[ingredientName]);
              } }
              type="button"
              className="effectBtn"
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ value[ingredientName] }
                src={ src }
              />
            </button>
            <h3 data-testid={ `${index}-card-name` }>{value[ingredientName]}</h3>
          </div>
        );
      }) : null}
      ;
    </>
  );
}

export default ExploreFoodOrDrink;
