// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';
import '../css/Header.css';
import '../css/Loading.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    this.pegandoUser();
  }

  pegandoUser = async () => {
    this.setState({ loading: true });
    const nome = await getUser();
    const { image, name } = nome;
    if (nome) { this.setState({ loading: false, image, name }); }
  };

  render() {
    const { loading, name, image } = this.state;
    return (
      <header data-testid="header-component">
        <div className="links">
          <Link to="/search" data-testid="link-to-search" className="link">Search</Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favorites

          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="link">Perfil</Link>
        </div>
        {loading ? (
          <div className="user">
            <span className="c-loader" />
            <Carregando />
          </div>)
          : (
            <div className="user">
              {image === '' ? (null) : (<img
                src={ image }
                alt={ name }
                className="imagemPerfil"
              />)}
              <p data-testid="header-user-name">{name}</p>
            </div>)}
      </header>
    );
  }
}

export default Header;
