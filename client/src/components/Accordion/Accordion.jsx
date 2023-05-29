import React, { useState } from 'react'
import './accordion.scss'

function Accordion({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    let url;
    let title;
    let content1;
    let content2;
    let content3;
    let content4;
    let list1;
    switch (data.__typename) {
        case 'Person':
            url = `/person/${data._id}`
            title = `${data.lastname}, ${data.firstname}`
            content1 = data.department.name
            content2 = data.role.name
            content3 = data.email
            content4 = data.phone
            list1 = data.assets
            break;
        case 'Asset':
            url = `/asset/${data._id}`
            title = data.name
            content1 = data.description
            content2 = data.category[0].name
            content3 = data.isSignedOut.toString()
            list1 = data.signInOut
            break;
        case 'Department':
            url = `/department/${data._id}`
            title = data.name
            content1 = `${data.manager.lastname}, ${data.manager.firstname}`
            content2 = data.manager.role.name
            // content3 = data.phone
            list1 = data.people
            break;
        default:
            title = 'Error'
            content1 = 'Error'
    }
    const renderList1ItemContent = (listitem) => {
        if (listitem.person) {
            // for typeof assets - render people
            return `${listitem.person.lastname}, ${listitem.person.firstname}`;
        } else if (listitem.lastname) {
            // for typeof departments - render people
            return `${listitem.lastname}, ${listitem.firstname}`;
        } else {
            // for typeof people - render assets
            return listitem.name;
        }
    };

    return (
        <div className="accordion">

            <div className="accordion-header" onClick={toggleAccordion}>
                {/* left column */}
                <div>
                    <h5><a href={url} className='no-link dark'>{title.toUpperCase()}</a></h5>
                    <p className='smalltext'>{content1} - {content2}</p>
                </div>
                {/* right column */}
                <div>
                    <p className='smalltext text-align-right'>{content3}</p>
                    <p className='smalltext text-align-right'>{content4}</p>
                </div>
            </div>
            {isExpanded && list1.length > 0 && (
                <ul className="accordion-list1">
                    {list1.map((listitem) => (
                        <li key={listitem._id}>
                            {renderList1ItemContent(listitem)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Accordion