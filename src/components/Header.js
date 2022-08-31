import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.pegandoUser();
  }

  pegandoUser = async () => {
    this.setState({ loading: true });
    const nome = await getUser();
    if (nome) { this.setState({ loading: false, name: nome }); }
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <div className="links">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
        {loading ? (<Carregando />) : (<p data-testid="header-user-name">{name.name}</p>)}
      </header>
    );
  }
}

export default Header;
