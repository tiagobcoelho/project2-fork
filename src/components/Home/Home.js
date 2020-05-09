import React from 'react';

import './home.scss';
import Page1 from './Homesubcomponents/Page1';
import Page2 from './Homesubcomponents/Page2';
import Page3 from './Homesubcomponents/Page3';

function Home() {
  
  
    return(
      <div className='home-wrapper'>
        <div className='page-wrapper'>
            <Page1 />
            <Page2 />
            <Page3 />
      </div>
      </div>
      
    )
}

export default Home;
