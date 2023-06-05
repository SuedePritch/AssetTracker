import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Accordion from '../../components/Accordion/Accordion';
import { ALL_PEOPLE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
function People() {
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

export default People