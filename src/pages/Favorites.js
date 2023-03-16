import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../css/Favoritas.css';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: false,
      favoritas: [],
    };
  }

  componentDidMount() {
    this.pegandoFavs();
  }

  componentDidUpdate() {

  }

  pegandoFavs = async () => {
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ favoritas, carregando: false });
  };

  att = async () => {
    this.setState({ carregando: true });
    await this.pegandoFavs();
    this.setState({ carregando: false });
  };

  render() {
    const { carregando, favoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1 className="tittle">Musicas Favoritas</h1>
        {carregando === true ? (
          <div className="load">
            <span className="c-loader" />
            <Carregando />
          </div>
        ) : (null)}
        <div className="Favoritas">
          {favoritas.map((musica) => (<MusicCard
            musica={ musica }
            key={ musica.trackId }
            trackName={ musica.trackName }
            previewUrl={ musica.previewUrl }
            trackId={ Number(musica.trackId) }
            image={ musica.artworkUrl100 }
            att={ this.att }
            check={
              favoritas.filter((music) => (
                music.trackId === musica.trackId)).length !== 0
            }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
