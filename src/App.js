import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      inputName: '',
      carregando: false,
      logado: false,
      searchDisabled: true,
    };
  }

  onChange = (event) => {
    const { target: { value } } = event;
    const minLength = 3;
    if (value.length >= minLength) {
      this.setState({ disabled: false });
    }
    this.setState({ inputName: value });
  };

  loginClick = () => {
    this.setState({ carregando: true }, async () => {
      const { inputName } = this.state;
      const criando = await createUser({ name: inputName });
      if (criando) {
        this.setState({ carregando: false, logado: true });
      }
    });
  };

  searchChange = (event) => {
    const { target: { value } } = event;
    if (value.length >= 2) { this.setState({ searchDisabled: false }); } else {
      (this.setState({ searchDisabled: true }));
    }
  };

  render() {
    const { carregando, disabled, inputName, logado, searchDisabled } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              disabled={ disabled }
              onChange={ this.onChange }
              inputName={ inputName }
              loginClick={ this.loginClick }
              carregando={ carregando }
              logado={ logado }
            />) }
          />
          <Route
            exact
            path="/search"
            render={ () => (<Search
              searchDisabled={ searchDisabled }
              searchChange={ this.searchChange }
            />) }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
