import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    carregando: true,
    user: {},
  };

  componentDidMount() {
    this.pegandoUser();
  }

  pegandoUser = async () => {
    const user = await getUser();
    this.setState({ carregando: false, user });
  };

  render() {
    const { carregando, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        {carregando ? (<Carregando />) : (
          <div>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
            <section>
              <h2>Nome</h2>
              <p>{name}</p>
            </section>
            <section>
              <h2>E-mail</h2>
              <p>{email}</p>
            </section>
            <section>
              <h2>Descrição</h2>
              <p>{description}</p>
            </section>
          </div>)}
      </div>
    );
  }
}

export default Profile;
