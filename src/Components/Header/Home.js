import React from 'react';
import Header from './Header';


function Home() {
  
  return (
    <div>
      <Header />
      <div id='home-section' className='landing-section'>
        <div className='landing-text'>
          <p>Take control of your finances</p>
          <div className='landing-des'>
            <span>Achieve your financial goals with easy budget tracking and management on our website</span>
          </div>
          <div className='landing-btns'>
            <button>Learn More</button>
          </div>
        </div>
        <div className='landing-img'>
        </div>
      </div>

      
    </div>
  );
}

export default Home;