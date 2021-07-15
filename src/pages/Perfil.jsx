import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import favoriteRecipes from '../images/favoriteRecipes.svg';
import checkedRecipes from '../images/checkedRecipes.svg';
import '../styles/Perfil.css';
import useGravatar from '../hooks/useGravatar';

function Perfil() {
  const gravatar = useGravatar();
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const { email } = user;
  const history = useHistory();

  function onClick() {
    localStorage.clear();
  }

  return (
    <>
      <Header title="Perfil" />
      <div className="fatherPerfil">
        <div className="perfilPicture">
          <img alt="profile" src={ gravatar } />
          <div>
            <MdEmail />
            <h2 data-testid="profile-email">{ email }</h2>
          </div>
        </div>
        <div className="FatherButtons-perfil">
          <button
            type="button"
            className="btn-details-perfil"
            data-testid="profile-favorite-btn"
            onClick={ (() => history.push('/receitas-favoritas')) }
          >
            <img src={ favoriteRecipes } alt="favorite" />
            <div>
              Receitas Favoritas
            </div>

          </button>
          <button
            className="btn-details-perfil"
            type="button"
            data-testid="profile-done-btn"
            onClick={ (() => history.push('/receitas-feitas')) }
          >
            <img src={ checkedRecipes } alt="checked" />
            <div>
              Receitas Feitas
            </div>

          </button>
        </div>
        <button
          className="logout"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            onClick();
            history.push('/');
          } }
        >
          Sair
        </button>
      </div>
      <BottomMenu />
    </>
  );
}

export default Perfil;
