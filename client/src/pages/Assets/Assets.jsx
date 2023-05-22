import React from 'react'
import { useQuery } from '@apollo/client';
import { fromUnixTime, format } from 'date-fns'

import { All_ASSETS } from '../../utils/queries';


function Assets() {
    let assets;
    const { loading, data } = useQuery(All_ASSETS);
    if (loading) return 'Loading...';
    if (!loading) {
        assets = data.allAssets;
    }
    return (
        <div>{assets.map((asset) => (
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
        ))}</div>
    )
}

export default Assets