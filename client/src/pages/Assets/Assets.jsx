import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
// import { fromUnixTime, format } from 'date-fns'

import { ALL_ASSETS } from '../../utils/queries';
import Navbar from '../../components/Navbar/Navbar';

import Modal from '../../components/Modal/Modal';
import AddAsset from '../../components/Forms/AddAsset';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../../components/Button/Button';

function Assets() {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    };


    let assets;
    const { loading, data } = useQuery(ALL_ASSETS);
    if (loading) return 'Loading...';
    if (!loading) {
        assets = data.allAssets;
    }
    return (
        <>
            <Navbar />
            <div className='main-content'>
                <div id='add-asset-button'>
                    <Button onClick={openModal} text="Add Asset" size="medium" />
                </div>
                <Modal formComponent={<AddAsset />} isOpen={isOpen} onClose={closeModal} />
                {assets.map((asset) => (
                    < Accordion data={asset} key={asset._id} />
                ))}
                {/* {assets.map((asset) => (
                <div className='asset-card-header' key={asset._id}>
                    <h2>{asset.name}</h2>
                    <h4>{asset.signInOut.map((singleSignEvent) => {
                        const unixTime = new Date(singleSignEvent.date / 1000)
                        const dateHelper = fromUnixTime(unixTime)
                        const date = dateHelper.toLocaleDateString().split('/').join(',')
                        const formattedDate = format(new Date(date), 'yyyy MMM dd hh:mm a')
                        return (
                            <div key={singleSignEvent._id}>
                                <p>{formattedDate} --- <i>{singleSignEvent.person.firstname}, {singleSignEvent.person.lastname}</i></p>
                            </div>
                        )
                    })}</h4>
                </div>
            ))} */}
            </div>
        </>
    )
}

export default Assets