import React from 'react'
import { useQuery } from '@apollo/client';

// Component Imports
import Navbar from '../../components/Navbar/Navbar';
import { ALL_PEOPLE } from '../../utils/queries';
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
        {/* <Assets /> */}
        {people.map((person) => (
          <div key={person._id}>
            <h3>{person.firstname} {person.lastname}</h3>
            <p>{person.email}</p>
            <p>{person.phone}</p>
            <p>{person.role.name} {person.department.name}</p>
          </div>
        ))}

      </div>
    </div >
  )
}

export default Main