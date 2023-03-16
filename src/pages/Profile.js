import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/Profile.css';

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
        {carregando ? (
          <div className="load">
            <span className="c-loader" />
            <Carregando />
          </div>
        ) : (
          <div className="box-profile">
            <section className="imag">
              {image === '' ? (null) : (
                <img src={ image } alt={ name } data-testid="profile-image" />)}
            </section>
            <Link to="/profile/edit" className="edit">Editar perfil</Link>
            <section className="nome">
              <h2>Nome:</h2>
              <p>{name}</p>
            </section>
            <section className="nome">
              <h2>E-mail:</h2>
              <p>{email}</p>
            </section>
            <section className="nome">
              <h2>Descrição:</h2>
              <p>{description}</p>
            </section>
          </div>)}
      </div>
    );
  }
}

export default Profile;
