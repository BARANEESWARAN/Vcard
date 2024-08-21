// import React, { useState, useEffect } from "react";
// import vCardsJS from "vcards-js";
// import QRCode from "qrcode";
// import "./Vcard.css"; // Your CSS file

// const Vcard = () => {
//   const [contact, setContact] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     jobTitle: "",
//     website: "",
//   });

//   const [qrCode, setQrCode] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setContact((prevContact) => ({ ...prevContact, [name]: value }));
//   };

//   const generateVCard = () => {
//     const vCard = vCardsJS();
//     vCard.firstName = contact.firstName;
//     vCard.lastName = contact.lastName;
//     vCard.cellPhone = contact.phone;
//     vCard.email = contact.email;
//     vCard.title = contact.jobTitle;
//     vCard.url = contact.website || "";
//     vCard.version = "3.0";
//     vCard.rev = new Date().toISOString();

//     return vCard.getFormattedString();
//   };

//   const generateQRCode = async () => {
//     const vCardData = generateVCard();
//     try {
//       const qr = await QRCode.toDataURL(vCardData);
//       setQrCode(qr);
//     } catch (err) {
//       console.error("QR code generation failed", err);
//     }
//   };

//   const handleDownloadQRCode = () => {
//     const downloadLink = document.createElement("a");
//     downloadLink.href = qrCode;
//     downloadLink.download = "contact-qr-code.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   useEffect(() => {
//     if (Object.values(contact).some((value) => value.trim() !== "")) {
//       generateQRCode();
//     }
//   }, [contact]);

//   return (
//     <div className="qr-code-generator">
//       <h2>Vcard QrCode Generator</h2>
//       <div className="content-container">
//         <div className="input-container">
//           {/* Form Inputs */}
//           <div className="input-group">
//             <label htmlFor="firstName" className="input-label">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={contact.firstName}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="lastName" className="input-label">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={contact.lastName}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="phone" className="input-label">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={contact.phone}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="email" className="input-label">
//               Email
//             </label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={contact.email}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="jobTitle" className="input-label">
//               Job Title
//             </label>
//             <input
//               type="text"
//               id="jobTitle"
//               name="jobTitle"
//               value={contact.jobTitle}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="website" className="input-label">
//               Website
//             </label>
//             <input
//               type="text"
//               id="website"
//               name="website"
//               value={contact.website || ""}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//         </div>

//         {/* Display the Generated QR Code */}
//         {qrCode && (
//           <div className="qr-code-display">
//             <img src={qrCode} alt="Generated QR Code" />
//             <button onClick={handleDownloadQRCode} className="download-button">
//               Download QR Code
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Vcard;

import React, { useState, useEffect } from "react";
import vCardsJS from "vcards-js";
import QRCode from "qrcode";
import "./Vcard.css"; // Your CSS file

const Vcard = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    jobTitle: "",
    website: "",
  });

  const [qrCode, setQrCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const generateVCard = () => {
    const vCard = vCardsJS();
    vCard.firstName = contact.firstName;
    vCard.lastName = contact.lastName;
    vCard.cellPhone = contact.phone;
    vCard.email = contact.email;
    vCard.title = contact.jobTitle;
    vCard.url = contact.website || "";
    vCard.version = "3.0";
    vCard.rev = new Date().toISOString();

    return vCard.getFormattedString();
  };

  const generateQRCode = async () => {
    const vCardData = generateVCard();
    try {
      const qr = await QRCode.toDataURL(vCardData);
      setQrCode(qr);
    } catch (err) {
      console.error("QR code generation failed", err);
    }
  };

  const handleDownloadQRCode = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCode;
    downloadLink.download = "contact-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDownloadVCard = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${contact.firstName}_${contact.lastName}.vcf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (Object.values(contact).some((value) => value.trim() !== "")) {
      generateQRCode();
    }
  }, [contact]);

  return (
    <div className="qr-code-generator">
      <h2>Vcard QrCode Generator</h2>
      <div className="content-container">
        <div className="input-container">
          {/* Form Inputs */}
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="jobTitle" className="input-label">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={contact.jobTitle}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="website" className="input-label">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={contact.website || ""}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        {/* Display the Generated QR Code */}
        {qrCode && (
          <div className="qr-code-display">
            <img src={qrCode} alt="Generated QR Code" />
            <button onClick={handleDownloadQRCode} className="download-button">
              Download QR Code
            </button>
            <button onClick={handleDownloadVCard} className="download-button">
              Download vCard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vcard;
