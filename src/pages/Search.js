import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Album from '../components/Albuns';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchDisabled: true,
      carregando: false,
      artistaSearch: '',
      albumArray: [],
      falhou: false,
    };
  }

  componentDidMount() {}

  searchChange = (event) => {
    const { target: { value } } = event;
    this.setState({ searchInput: value });
    if (value.length >= 2) { this.setState({ searchDisabled: false }); } else {
      (this.setState({ searchDisabled: true }));
    }
  };

  searchClick = async () => {
    const { searchInput } = this.state;
    this.setState({ carregando: true, artistaSearch: searchInput, falhou: false });
    const albuns = await searchAlbumsAPI(searchInput);
    this.setState({ albumArray: albuns }, () => {
      this.setState({ carregando: false, searchInput: '' });
    });
    if (albuns.length === 0) this.setState({ falhou: true });
  };

  render() {
    const { searchInput, searchDisabled, albumArray,
      artistaSearch, carregando, falhou } = this.state;
    if (carregando) return <Carregando />;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          value={ searchInput }
          onChange={ this.searchChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ searchDisabled }
          type="button"
          onClick={ this.searchClick }
        >
          Pesquisar

        </button>
        <div>
          {artistaSearch !== '' ? (<p>{`Resultado de álbuns de: ${artistaSearch}`}</p>)
            : (null)}
          {falhou === true ? (<h1>Nenhum álbum foi encontrado</h1>) : (null)}
          {albumArray.length >= 1 ? (albumArray.map((album) => (
            <Album
              key={ album.collectionId }
              collectionName={ album.collectionName }
              collectionId={ album.collectionId }
              image={ album.artworkUrl100 }
              artistName={ album.artistName }
            />
          )))
            : (null)}
        </div>
      </div>
    );
  }
}

export default Search;
