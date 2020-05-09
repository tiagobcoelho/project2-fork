import React from 'react';
import PropTypes from 'prop-types';
import './SortBy.scss'


function SortBy(props) {
  const { handleSortByChange, bottomTabExpanded } = props;
  return (
    <div className={bottomTabExpanded ? "sort-by" : "display-none"}>
      <label for='filter'>sort by : </label>
      <select id='filter' onChange={handleSortByChange}>
        <option key="rating" value="rating">top rated</option>
        <option key="time" value="time">less time</option>
      </select>
    </div>
  );
}
SortBy.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default SortBy;
