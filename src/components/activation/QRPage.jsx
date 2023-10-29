import { useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { useDbData } from "../../utilities/firebase";
import "./QRPage.css";

const QRPage = () => {
  const id = window.location.pathname.split("/").pop();
  const url = `https://qrfound-95d07.web.app/found/${id}`;
  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    html2canvas(qrCodeRef.current, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const data = useDbData(`/registered_items/${id}`);
  console.log(id, data);

  return (
    <div className="qr-page-div" ref={qrCodeRef}>
      {!data[0] && <h1>This is your QR code!</h1>}
      {data[0] && (
        <h1>
          This is your QR code for the {data[0].color && data[0].color}{" "}
          {data[0].brand && data[0].brand} {data[0].itemName}
        </h1>
      )}
      <h2>Keep it safe!</h2>
      <QRCode size="200" className="qr-code" value={url} />
      <div className="qr-page-buttons">
        <button onClick={handleDownload}>Download</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default QRPage;
