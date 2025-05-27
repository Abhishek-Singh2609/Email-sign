import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./HeaderSection.css";
import emailimg from "../assets/HomePage/home.jpg";

const HeaderSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
      <div className="space-x-4 text-center mt-5">
            {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 trial-button">
              Start Now Free Trial
            </button> */}
          </div>
        <div className="text-center mt-5">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 hero-h1">
          Your Signature, Your Impact <br />  Impressions That Go Beyond the Inbox
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 hero-p">
            The perfect enterprise email signature management solution to create consistent,<br />
            secure and compliant email signatures across all devices and teams.
          </p>
          <div className="hero-image-container">
            <img
              src={emailimg} 
              alt="Email Signature Example"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;