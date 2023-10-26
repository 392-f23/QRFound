import React, { useState } from "react";
import "./Activator.css";

const Activator = () => {
  // for the firstName, lastName, phoneNumber, email, this should already be connected to the account when they log in
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    itemType: "",
    brand: "",
    color: "",
    photo: "",
    moreInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // You may want to check the file type, size, etc. here
    setFormData({
      ...formData,
      photo: file, // Store the file object in the formData
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission logic,
    // such as generating the QR code and saving the data.
    // You can use formData object to access the form values.
    // For now, let's just log the data.
    console.log(formData);
  };

  return (
    <div className="activator-div">
      <h2 className="register-your-item">Register Your Item</h2>
      <form className="activate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemType">ITEM TYPE</label>
          <select
            id="itemType"
            name="itemType"
            value={formData.itemType}
            onChange={handleInputChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
            <option value="Sports Equipment">Sports Equipment</option>
            <option value="Kitchen Appliances">Kitchen Appliances</option>
            <option value="Toys">Toys</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Tools">Tools</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">BRAND / MANUFACTURER</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">COLOR</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">PHOTO</label>
          <input
            type="file"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleFileInputChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="moreInfo">MORE INFO</label>
          <textarea
            id="moreInfo"
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <button className="get-my-qr" type="submit">Get My QR</button>
      </form>
    </div>
  );
};

export default Activator;
