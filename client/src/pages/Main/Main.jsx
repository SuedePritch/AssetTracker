import React from 'react'
import { useQuery } from '@apollo/client';
import { fromUnixTime, format } from 'date-fns'

import { All_ASSETS } from '../../utils/queries';
// Component Imports
import Navbar from '../../components/Navbar/Navbar';

function Main() {
  let assets;
  const { loading, data } = useQuery(All_ASSETS);
  if (loading) return 'Loading...';
  if (!loading) {
    assets = data.allAssets;
  }

  return (
    <div>
      <Navbar />
      <div className='main-content'>
        {assets.map((asset) => (
          <div className='asset-card-header' key={asset._id}>
            <h2>{asset.name}</h2>
            <h4>{asset.signInOut.map((singleSignEvent) => {
              const unixTime = new Date(singleSignEvent.date / 1000)
              const dateHelper = fromUnixTime(unixTime)
              const date = dateHelper.toLocaleDateString().split('/').join(',')
              const formattedDate = format(new Date(date), 'yyyy MMM dd')
              return (
                <div key={singleSignEvent._id}>
                  <p>{formattedDate} --- <i>{singleSignEvent.comments} {singleSignEvent.user.username}</i></p>
                </div>
              )
            })}</h4>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Main