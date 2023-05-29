import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SINGLE_ASSET } from '../../utils/queries';

import Navbar from '../../components/Navbar/Navbar';
import QRCode from '../../components/QRCode/QRCode';

function SingleAsset() {
    const assetId = useParams().assetId;
    let asset;
    const { loading, data } = useQuery(SINGLE_ASSET, {
        variables: { id: assetId },
    });
    if (loading) return 'Loading...';
    if (!loading) {
        asset = data.singleAsset;
    }
    return (
        <>
            <Navbar />
            <div className="main-content">
                <h1>{asset.name}</h1>
                <h4>{asset.isSignedOut.toString()}</h4>
                {asset.qrcode && <QRCode qrCodeImageData={asset.qrcode} filename={asset.name} />}
            </div>
        </>
    )
}

export default SingleAsset