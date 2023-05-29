import React from 'react';
import { createCanvas, loadImage } from 'canvas';
import voca from 'voca';
import logoImage from '../../assets/random-logo.png';

const v = voca;

const QRCode = ({ qrCodeImageData, filename }) => {
    const qrcodeWithLabel = async (qrCodeImageData) => {
        const qrcodeImage = await loadImage(qrCodeImageData);
        const labelImage = await loadImage(logoImage);

        const qrcodeHeight = qrcodeImage.height;

        // Calculate the scaled dimensions of the label image
        const labelHeight = qrcodeHeight;
        const labelWidth = (labelHeight / labelImage.height) * labelImage.width;

        const canvasWidth = qrcodeImage.width + labelWidth;
        const canvasHeight = qrcodeHeight;

        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        // Draw the QR code image
        ctx.drawImage(qrcodeImage, 0, 0);

        // Draw the label image next to the QR code
        const labelX = qrcodeImage.width;
        const labelY = 0;
        ctx.drawImage(labelImage, labelX, labelY, labelWidth, labelHeight);

        const qrcodeWithLabel = canvas.toDataURL();
        return qrcodeWithLabel;
    };

    const handleDownload = async () => {
        const completeQrCode = await qrcodeWithLabel(qrCodeImageData);
        const link = document.createElement('a');
        link.href = completeQrCode;
        link.download = v.kebabCase(filename) + '.png';
        link.click();
    };

    return (
        <button className="link-button" onClick={handleDownload}>
            Download QR Code
        </button>
    );
};

export default QRCode;
