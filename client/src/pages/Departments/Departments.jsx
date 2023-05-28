import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_DEPARTMENTS } from '../../utils/queries';
import Accordion from '../../components/Accordion/Accordion';
import NavBar from '../../components/Navbar/Navbar';
function Departments() {
    let departments;
    const { loading, data } = useQuery(ALL_DEPARTMENTS);
    if (loading) return 'Loading...';
    if (!loading) {
        departments = data.allDepartments;
        console.log(departments);
    }
    return (
        <>
            <NavBar />
            <div className='main-content'>
                {departments.map((department) => (
                    < Accordion data={department} key={department._id} />
                ))}
            </div>
        </>
    )
}

export default Departments