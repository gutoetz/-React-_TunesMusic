import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from './Carregando';
import '../css/Login.css';
import '../css/Loading.css';
import '../components/Header';

class Login extends React.Component {
  render() {
    const { disabled, onChange, inputName, loginClick, carregando, logado } = this.props;
    if (carregando) {
      return (
        <div className="load">
          <span className="c-loader" />
          <Carregando />
        </div>
      );
    }
    if (logado) { return <Redirect to="/search" />; }

    return (
      <div data-testid="page-login" className="login">
        <div className="area">
          <h1>Tunes Music</h1>
        </div>
        <section>
          <p>Digite seu nome:</p>
          <input
            data-testid="login-name-input"
            type="text"
            value={ inputName }
            onChange={ onChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ loginClick }
            disabled={ disabled }
          >
            Entrar
          </button>
        </section>

      </div>
    );
  }
}

Login.propTypes = {
  inputName: PropTypes.string.isRequired,
  loginClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  logado: PropTypes.bool.isRequired,
  carregando: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Login;
