import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../css/MusicDisplay.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      albumName: '',
      musics: [],
      artworkUrl100: '',
      carregando: false,
      favoritas: [],
    };
  }

  componentDidMount() {
    this.requisitandoMusicas();
    this.pegandoFavoritas();
  }

  requisitandoMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musicas[0];
    console.log(musicas);
    this.setState({ artist: artistName,
      albumName: collectionName,
      musics: musicas,
      artworkUrl100 });
  };

  pegandoFavoritas = async () => {
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ favoritas, carregando: false });
  };

  att = () => {
    this.setState({ carregando: true });
    this.pegandoFavoritas();
    this.setState({ carregando: false });
  };

  render() {
    const { artist, albumName, musics, artworkUrl100,
      carregando, favoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {carregando === true ? (
          <div className="load">
            <span className="c-loader" />
            <Carregando />
          </div>
        ) : (null)}
        <div className="box-contain">
          <section className="albumPresent">
            <img src={ artworkUrl100 } alt={ albumName } />
            <h1 data-testid="artist-name">{artist}</h1>
            <h3 data-testid="album-name">{albumName}</h3>
          </section>
          <section className="musicSection">
            {musics.length === 0 ? (null) : (
              musics.filter((musica) => musica.kind === 'song').map((musica) => (
                <MusicCard
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
                />
              ))
            )}
          </section>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
