import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

const QrCodeWithFrame = () => {
  const qrRef = useRef();
  const websiteURL = "https://my-shop-topaz-six.vercel.app/";

  const downloadWithFrame = async () => {
    const qrCanvas = qrRef.current.querySelector('canvas');

    const qrImage = new Image();
    qrImage.src = qrCanvas.toDataURL("image/png");

    const frameImage = new Image();
    frameImage.src = "/frame.png"; // from public folder

    frameImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = frameImage.width;
      canvas.height = frameImage.height;

      const ctx = canvas.getContext('2d');

      // Draw frame
      ctx.drawImage(frameImage, 0, 0);

      // Draw QR in center of frame
      const x = (canvas.width - 256) / 2;
      const y = (canvas.height - 256) / 2;
      ctx.drawImage(qrImage, x, y, 256, 256);

      // Convert final canvas to image and download
      const url = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-with-frame.png';
      link.click();
    };
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={qrRef} style={{ display: 'none' }}>
        <QRCodeCanvas value={websiteURL} size={256} />
      </div>
      <button onClick={downloadWithFrame}>Download QR with Frame</button>
    </div>
  );
};

export default QrCodeWithFrame;
