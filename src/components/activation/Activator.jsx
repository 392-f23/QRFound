import React, { useState, useEffect } from "react";
import "./Activator.css";
import { useDbAdd, useDbUpdate } from "../../utilities/firebase";
import { v4 as uuidv4 } from "uuid";
import { useProfile } from "../../utilities/profile.js";

// make the activator take in user profile from signing in
const Activator = ({ user }) => {
  // setting errors for required fields
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    userId: user?.user?.uid || "",
    firstName: user?.user?.displayName.split(" ")[0] || "",
    lastName: user?.user?.displayName.split(" ")[1] || "",
    email: user?.user?.email || "",
    phoneNumber: "",
    itemName: "",
    itemType: "",
    brand: "",
    color: "",
    photo: "",
    moreInfo: "",
    additionalUserEmails: [],
  });
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    updateLocation();
  }, []);

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          setLoadingLocation(false);
        },
        () => {
          alert("Error in getting location. Proceeding without location data.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. Proceeding without location data."
      );
      setLoadingLocation(false);
    }
  };
  const [newAdditionalUserEmail, setNewAdditionalUserEmail] = useState("");

  const handleAdditionalUserEmailChange = (e) => {
    setNewAdditionalUserEmail(e.target.value);
  };

  const handleAddAdditionalUserEmail = () => {
    if (newAdditionalUserEmail.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        additionalUserEmails: [
          ...prevData.additionalUserEmails,
          newAdditionalUserEmail,
        ],
      }));
      setNewAdditionalUserEmail("");
    }
  };

  const handleRemoveAdditionalUserEmail = (index) => {
    setFormData((prevData) => {
      const updatedEmails = [...prevData.additionalUserEmails];
      updatedEmails.splice(index, 1);
      return {
        ...prevData,
        additionalUserEmails: updatedEmails,
      };
    });
  };

  useEffect(() => {
    if (user && user.user && location) {
      setFormData((prevState) => ({
        ...prevState,
        userId: user.user.uid,
        firstName: user.user.displayName.split(" ")[0],
        lastName: user.user.displayName.split(" ")[1],
        email: user.user.email,
        location: [location?.latitude, location?.longitude],
      }));
    }
  }, [user, location]);

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

  // set add
  const newId = uuidv4();
  const [add, result] = useDbAdd("/registered_items", newId);

  const handleSubmit = (e) => {
    console.log("going into the form", formData);

    e.preventDefault();
    updateLocation();
    const newErrors = {};
    const requiredFields = ["itemName", "itemType", "brand", "color"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "missing field";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    add(formData);
    const newUrl = `myqr/${newId}`;
    window.location.href = newUrl;

    setFormData({
      userId: user?.user?.uid || "",
      firstName: user?.user?.displayName.split(" ")[0] || "",
      lastName: user?.user?.displayName.split(" ")[1] || "",
      email: user?.user?.email || "",
      phoneNumber: "",
      itemName: "",
      itemType: "",
      brand: "",
      color: "",
      photo: "",
      moreInfo: "",
      additionalUserEmails: [],
    });
  };

  return (
    <div className="activator-div">
      <h2 className="register-your-item">Register Your Item</h2>
      <form className="activate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">ITEM NAME</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            className={errors.itemName ? "input-error" : ""}
          />
        </div>
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
          <label htmlFor="additionalUserEmails">ADDITIONAL USER EMAILS</label>
          <div className="additional-user-emails">
            {formData.additionalUserEmails.map((email, index) => (
              <div key={index} className="additional-user-email">
                {email}
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalUserEmail(index)}
                  className="button-remove"
                >
                  X
                </button>
              </div>
            ))}
            <div className="email-adder-div">
              <div className="email-adder">
                <input
                  type="text"
                  id="additionalUserEmail"
                  name="additionalUserEmail"
                  value={newAdditionalUserEmail}
                  onChange={handleAdditionalUserEmailChange}
                  className="input-additional-email"
                />
                <button
                  type="button"
                  onClick={handleAddAdditionalUserEmail}
                  className="button-add"
                >
                  +
                </button>
              </div>
            </div>
          </div>
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
        <button className="get-my-qr" type="submit" disabled={loadingLocation}>
          Get My QR
        </button>
      </form>
    </div>
  );
};

export default Activator;
