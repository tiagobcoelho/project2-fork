import React from 'react';
import PropTypes from 'prop-types';
import { TiDelete } from 'react-icons/ti';

function Filters(props) {
  const {
    name,
    removeFilter,
  } = props;
  return (
    <div className="filters-wrapper">
      <div className='filter-name'>{name}</div>
      <TiDelete className="remove" onClick={() => removeFilter(name)} />
    </div>
  );
}

Filters.propTypes = {
  name: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default Filters;
