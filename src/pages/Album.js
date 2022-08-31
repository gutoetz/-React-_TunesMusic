import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.requisitandoMusicas();
  }

  requisitandoMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const { artistName, collectionName } = musicas[0];
    this.setState({ artist: artistName, albumName: collectionName, musics: musicas });
    console.log(musicas);
  };

  render() {
    const { artist, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <section>
            <h1 data-testid="artist-name">{artist}</h1>
            <h3 data-testid="album-name">{albumName}</h3>
          </section>
          <section className="musicSection">
            {musics.length === 0 ? (null) : (
              musics.filter((musica) => musica.kind === 'song').map((musica) => (
                <MusicCard
                  key={ musica.trackId }
                  trackName={ musica.trackName }
                  previewUrl={ musica.previewUrl }
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
