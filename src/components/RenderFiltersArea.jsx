import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/exploreArea.css';

function RendersFiltersArea({ area }) {
  const [apiHandleArea, setApiHandleArea] = useState([]);
  const { recipes: { foods } } = useContext(RecipesContext);
  const history = useHistory();

  const requestFoodsByArea = async (option) => {
    const number = 11;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`);
    const date = await response.json();
    if (date.meals) {
      const filter = date.meals.filter((elem, index) => index <= number);
      setApiHandleArea(filter);
    }
  };

  const handleClick = (idMeal) => {
    const path = `/comidas/${idMeal}`;
    history.replace(path);
  };

  useEffect(() => {
    requestFoodsByArea(area);
  }, [area]);

  useEffect(() => {
    if (area === 'All') setApiHandleArea(foods);
  });

  return (
    <div className="all">
      <div className="fatherExplore">
        { apiHandleArea ? apiHandleArea
          .map(({ strMeal, strMealThumb, idMeal }, index) => {
            const firstChild = index === 0 && 'firstExplore';
            return (
              <div
                className={ `explore-card ${firstChild}` }
                key={ strMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <button
                  type="button"
                  onClick={ () => handleClick(idMeal) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <h3
                    className="explore-card-text"
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </h3>
                </button>
              </div>
            );
          }) : null }

      </div>
    </div>

  );
}

RendersFiltersArea.propTypes = {
  area: PropTypes.string.isRequired,
};

export default RendersFiltersArea;
