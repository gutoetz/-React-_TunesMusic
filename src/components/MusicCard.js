import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../pages/Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.alreadyFav();
  }

  alreadyFav = () => {
    const { check } = this.props;
    if (check) { this.setState({ checked: true }); }
  };

  favoriteChange = async (event) => {
    const { checked } = event.target;
    this.setState({ carregando: true, checked });
    const { musica } = this.props;
    if (checked) {
      await addSong(musica);
    } else {
      await removeSong(musica);
    }
    const { att } = this.props;
    att();
    this.setState({ carregando: false });
  };

  render() {
    const { carregando, checked } = this.state;

    const { trackName, previewUrl, trackId } = this.props;
    if (carregando) return <Carregando />;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ this.favoriteChange }
            checked={ checked }
          />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  att: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  musica: PropTypes.shape({}).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
