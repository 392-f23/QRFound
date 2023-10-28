import React, { useState } from "react";
import "./Activator.css";
import { useDbAdd } from "../../utilities/firebase";
import { v4 as uuidv4 } from 'uuid';

// make the activator take in user profile from signing in
const Activator = () => {
  // setting errors for required fields
  const [errors, setErrors] = useState({});

  // set add
  const newId = uuidv4()
  const [add, result] = useDbAdd("/registered_items", newId);

  // for the firstName, lastName, phoneNumber, email, this should already be connected to the account when they log in
  const [formData, setFormData] = useState({
    userId: "Tester ID",
    firstName: "Tester First",
    lastName: "Tester Last",
    phoneNumber: "Tester Number",
    email: "Tester Email",
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

    if (errors[e.target.name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[e.target.name];
      setErrors(updatedErrors);
    }
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
    console.log(formData);

    e.preventDefault();
    const newErrors = {};
    const requiredFields = ["itemType", "brand", "color"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "missing field";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    add(formData);
    console.log(formData)
    setFormData({
      userId: "",
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
            className={errors.itemType ? "input-error" : ""}
          >
            <option disabled value=""></option>
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
            className={errors.brand ? "input-error" : ""}
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
            className={errors.color ? "input-error" : ""}
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
        {Object.keys(errors).length > 0 && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            Please fill out the missing fields.
          </div>
        )}
        <button className="get-my-qr" type="submit">
          Get My QR
        </button>
      </form>
    </div>
  );
};

export default Activator;
