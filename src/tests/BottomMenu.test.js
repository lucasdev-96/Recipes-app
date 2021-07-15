import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouterAndProvider from './renderWithRouterAndProvider';
import App from '../App';

describe('lower menu must have the attributes described in the prototype', () => {
  it('The bottom menu must have the attribute data-testid="footer"', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const bottomMenu = getByTestId('footer');
    expect(bottomMenu).toBeInTheDocument();
  });
  it('button food must have the data-testid="drinks-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const foodBtn = getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
  });
  it('button explore must have the data-testid="explore-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const exploreBtn = getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
  });
  it('button drinks must have the data-testid="food-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const drinksBtn = getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
  });
});

describe('Redirect the user by clicking on the icons', () => {
  it('Redirect the user to a cocktail list by clicking on the food icon', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const foodBtn = getByTestId('food-bottom-btn');
    fireEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/comidas');
  });
  it('Redirect the user to a cocktail list by clicking on the explore icon', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const foodBtn = getByTestId('explore-bottom-btn');
    fireEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/explorar');
  });
  it('Redirect the user to a cocktail list by clicking on the drinks icon', () => {
    const { getByTestId, history } = renderWithRouterAndProvider(
      <App />,
    );

    history.push('/comidas');
    const foodBtn = getByTestId('drinks-bottom-btn');
    fireEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/bebidas');
  });
});
