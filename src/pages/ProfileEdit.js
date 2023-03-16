import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import '../css/Loading.css';
import '../css/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: true,
      disabled: true,
      name: '',
      image: '',
      description: '',
      email: '',
    };
  }

  componentDidMount() {
    this.pegandoUser();
  }

  pegandoUser = async () => {
    const user = await getUser();
    const { name, image, email, description } = user;
    this.setState({ name, image, email, description, carregando: false });
  };

  handleChange = (event) => {
    const { target: { value, id } } = event;
    if (id === 'name') { this.setState({ name: value }); }
    if (id === 'image') { this.setState({ image: value }); }
    if (id === 'description') { this.setState({ description: value }); }
    if (id === 'email') { this.setState({ email: value }); }
    this.verificandoDisable();
  };

  verificandoDisable = () => {
    const { name, description, image, email } = this.state;
    const magic = 4;
    let points = 0;
    if (name.length > 0) points += 1;
    if (description.length > 0) points += 1;
    if (image.length > 0) points += 1;
    if (this.validateEmail(email) === true) points += 1;
    if (points === magic) { this.setState({ disabled: false }); }
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  handleClick = () => {
    this.setState({ carregando: true }, async () => {
      const { history } = this.props;
      const { name, image, description, email } = this.state;
      await updateUser({
        name, email, image, description,
      });
      history.push('/profile');
    });
  };

  render() {
    const { carregando, disabled, name, description, image,
      email } = this.state;
    // if (editado) { return <Redirect to="/profile" />; }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {carregando ? (
          <div className="load">
            <span className="c-loader" />
            <Carregando />
          </div>
        )
          : (
            <section className="container-form">
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                    type="text"
                    id="name"
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    onChange={ this.handleChange }
                    type="email"
                    data-testid="edit-input-email"
                    id="email"
                    value={ email }
                  />
                </label>
                <label htmlFor="description">
                  description:
                  <input
                    onChange={ this.handleChange }
                    type="text"
                    data-testid="edit-input-description"
                    id="description"
                    value={ description }
                  />
                </label>
                <label htmlFor="image">
                  Image:

                  <input
                    onChange={ this.handleChange }
                    type="text"
                    data-testid="edit-input-image"
                    id="image"
                    value={ image }
                  />
                </label>

                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ disabled }
                  onClick={ this.handleClick }
                >
                  Editar perfil

                </button>
              </form>
            </section>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
