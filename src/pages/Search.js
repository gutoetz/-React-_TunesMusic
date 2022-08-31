import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { searchChange, searchDisabled } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <input data-testid="search-artist-input" type="text" onChange={ searchChange } />
        <button
          data-testid="search-artist-button"
          disabled={ searchDisabled }
          type="button"
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

Search.propTypes = {
  searchChange: PropTypes.func.isRequired,
  searchDisabled: PropTypes.bool.isRequired,
};

export default Search;
