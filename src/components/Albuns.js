import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Album.css';

class Album extends React.Component {
  render() {
    const { collectionId, collectionName, image, artistName } = this.props;
    return (
      <div className="containerACard">
        <div className="albumCard">
          <section className="imgcard">
            <img src={ image } alt={ collectionName } className="imgContaine" />
          </section>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            className="linke"
          >
            {collectionName}

          </Link>
          <p>{artistName}</p>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Album;
