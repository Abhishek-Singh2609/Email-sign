import React from "react";

const TabNavigation = ({ activeTab, handleTabClick }) => {
  const tabs = [
    "Personal Info",
    "Images",
    "Social",
    "Design",
    "Banner",
    "Disclaimer",
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
