import React from 'react'
import { useQuery } from '@apollo/client';

// Component Imports
import Navbar from '../../components/Navbar/Navbar';

// import { ALL_ASSETS } from '../../utils/queries';
// import Assets from '../Assets/Assets';

function Main() {
  return (
    <>
      <Navbar />
      <div className='main-content'>
        <h1>MAIN</h1>
      </div>
    </>
  )
}

export default Main