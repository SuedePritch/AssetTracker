import React from 'react'
import { useQuery } from '@apollo/client';

// Component Imports
import Navbar from '../../components/Navbar/Navbar';
import Accordion from '../../components/Accordion/Accordion';
import { ALL_PEOPLE } from '../../utils/queries';
// import { ALL_ASSETS } from '../../utils/queries';
// import Assets from '../Assets/Assets';

function Main() {
  let people;
  const { loading, data } = useQuery(ALL_PEOPLE);
  if (loading) return 'Loading...';
  if (!loading) {
    people = data.allPeople
    console.log(people)
  }

  return (
    <div>
      <Navbar />
      <div className='main-content'>
        {people.map((person) => (
          < Accordion data={person} key={person._id} />
        ))}

      </div>
    </div>
  )
}

export default Main