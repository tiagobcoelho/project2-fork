import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GoPrimitiveDot } from 'react-icons/go';




function Page3() {

    return(
        <div id='home-page-3'>
          <div className='home-page-3-left'>
            <h1>search by <span>recipe</span></h1>
            <p>Don’t know what to cook?<br/>
               Want to impress someone special with your cooking skills?<br/>
               Dont’t worry, we got you!<br/>
               Search recipes by cusine or by category!<br/>
               Use our filters to find the top rated recipes as well as the fastest to cook!</p>
               <button className="go-to-btn">
                <Link to="/recipes">Go to recipes</Link>
            </button>
            <p className="next-info">Want to search recipes by ingredient?<br/>We got you!<br/><span>Just swipe right</span></p>
            <div className='dot-indicators'>
              <GoPrimitiveDot className='dot' />
              <GoPrimitiveDot className='dot' />
              <GoPrimitiveDot className='dot active' />
            </div>
            <a href='#home-page-2'><IoIosArrowBack className="prev-icon"/></a>
          </div>
          <div className='home-page-3-right'></div>
        </div>
        )
}

export default Page3;