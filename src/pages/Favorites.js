import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

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
    if (carregando) return <Carregando />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="Favoritas">
          {favoritas.map((musica) => (<MusicCard
            musica={ musica }
            key={ musica.trackId }
            trackName={ musica.trackName }
            previewUrl={ musica.previewUrl }
            trackId={ Number(musica.trackId) }
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
