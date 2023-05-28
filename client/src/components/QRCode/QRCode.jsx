import React from 'react'

const QRCode = ({ qrCodeImageData }) => {
    // const qrCodeUrl = URL.createObjectURL(new Blob([qrCodeImageData]));

    return (
        <div>
            <img src={qrCodeImageData} alt="QR Code" />
        </div>
    );
};

export default QRCode