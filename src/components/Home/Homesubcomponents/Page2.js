import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { GoPrimitiveDot } from 'react-icons/go';



function Page2() {

    return(
        <div id="home-page-2">
          <div className='home-page-2-left'>
            <h1>search recipes by <span>ingredient</span></h1>
            <p>Don’t know what to cook?<br/>
                Don’t feel like going grocery shopping?<br/>
                Dont’t worry, we got you!<br/>
                Search recipes by ingredients!<br/>
                Cook with the ingredients you have home!<br/>
                Save money and reduce waste!</p>
            <button className="go-to-btn"> 
                <Link to="/ingredients">Go to ingredients</Link>
            </button>
            <p className="next-info">Prefere a good old recipe search?<br/>we got you!<br/><span>Just swipe left</span></p>
            <div className='dot-indicators'>
              <GoPrimitiveDot className='dot' />
              <GoPrimitiveDot className='dot active' />
              <GoPrimitiveDot className='dot' />
            </div>
            <a href='#home-page-3'><IoIosArrowForward className="nxt-icon" /></a>
          </div>
          <div className='home-page-2-right'></div>
        </div>
        )
}

export default Page2;