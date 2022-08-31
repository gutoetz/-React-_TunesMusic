import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  render() {
    const { collectionId, collectionName, image, artistName } = this.props;
    return (
      <div className="albumCard">
        <img src={ image } alt={ collectionName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          {collectionName}

        </Link>
        <p>{artistName}</p>
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
