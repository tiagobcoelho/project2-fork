import React, { useState, useCallback } from 'react';
import ReactPageScroller from "react-page-scroller";

import './home.scss';
import Page1 from './Homesubcomponents/Page1';
import Page2 from './Homesubcomponents/Page2';
import Page3 from './Homesubcomponents/Page3';

function Home() {
  const [currentPage, setCurrentPage] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  } 

  const scroll = (e) => {
    window.scrollBy(e.deltaY, 0)
  }
  
  
    return(
      <div className='home-wrapper'>
        <div className='page-wrapper'>
            <Page1 handlePageChange={handlePageChange} />
            <Page2 handlePageChange={handlePageChange} />
            <Page3 handlePageChange={handlePageChange} />
      </div>
      </div>
      
    )
}

export default Home;
