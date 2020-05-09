import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import './searchBar.scss';


function SearchBar(props) {
  const {
    searchValue,
    handleChange,
    placeholder
  } = props;
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} value={searchValue} onChange={handleChange} />
      <MdSearch className="search" />
    </div>
  );
}

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
