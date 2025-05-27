import React, { useState } from "react";
import "./DesignTab.css";

// Design templates - expanded with more aesthetic options
const designTemplates = [
  {
    id: "default",
    name: "Default Blue",
    color: "#3498db",
    layout: "standard",
  },
  {
    id: "dark",
    name: "Dark Professional",
    color: "#704242",
    layout: "standard",
  },
  {
    id: "minimal",
    name: "Minimal Gray",
    color: "#7f8c8d",
    layout: "standard",
  },
  {
    id: "vibrant",
    name: "Vibrant Purple",
    color: "#9b59b6",
    layout: "standard",
  },
  {
    id: "green",
    name: "Natural Green",
    color: "#27ae60",
    layout: "standard",
  },
  {
    id: "modern",
    name: "Modern Split",
    color: "#e74c3c",
    layout: "split",
  },
  {
    id: "elegant",
    name: "Elegant Gold",
    color: "#f39c12",
    layout: "centered",
  },
  {
    id: "clean",
    name: "Clean Teal",
    color: "#16a085",
    layout: "horizontal",
  },
  {
    id: "gradient",
    name: "Gradient Blue",
    color: "brown",
    gradient: "linear-gradient(135deg, #3498db, #2980b9)",
    layout: "standard",
  },
  {
    id: "bordered",
    name: "Bordered Card",
    color: "#8e44ad",
    layout: "bordered",
  },
  {
    id: "banner",
    name: "Banner Design",
    color: "#34495e",
    layout: "banner",
  },
];

// Get style based on selected design
const getDesignStyle = (selectedDesign) => {
  const design = designTemplates.find((d) => d.id === selectedDesign);

  const baseStyle = {
    nameColor: design.color,
    accentColor: design.color,
    backgroundColor: selectedDesign === "dark" ? "#2c3e50" : "#f0f0f0",
    textColor: selectedDesign === "dark" ? "white" : "#333",
    borderStyle: selectedDesign === "minimal" ? "none" : "1px solid #e6e6e6",
    boxShadow:
      selectedDesign === "minimal" ? "none" : "0 2px 10px rgba(0, 0, 0, 0.05)",
    gradient: design.gradient || null,
    layout: design.layout,
  };

  // Add specific styling based on layout
  if (design.layout === "split") {
    return {
      ...baseStyle,
      containerStyle: {
        display: "flex",
        background: baseStyle.backgroundColor,
      },
      sidebarStyle: {
        width: "120px",
        backgroundColor: design.color,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      },
      contentStyle: {
        flex: 1,
        padding: "20px",
      },
    };
  }

  if (design.layout === "bordered") {
    return {
      ...baseStyle,
      borderStyle: `3px solid ${design.color}`,
      innerPadding: "16px",
    };
  }

  if (design.layout === "horizontal") {
    return {
      ...baseStyle,
      footerStyle: {
        backgroundColor: design.color,
        marginTop: "16px",
        padding: "12px",
        color: "white",
        borderRadius: "0 0 8px 8px",
      },
    };
  }

  if (design.layout === "centered") {
    return {
      ...baseStyle,
      textAlign: "center",
      dividerStyle: {
        width: "60%",
        margin: "12px auto",
        height: "2px",
        background: design.color,
      },
    };
  }

  return baseStyle;
};

const DesignTab = ({ selectedDesign, handleDesignChange }) => {
  // Local state to track the selected design
  const [localSelectedDesign, setLocalSelectedDesign] =
    useState(selectedDesign);

  // Update the design selection
  const handleDesignSelect = (designId) => {
    setLocalSelectedDesign(designId);
    handleDesignChange(designId);
  };

  return (
    <div className="design-tab-container">
      <p className="design-tab-intro">
        Select a design template for your email signature:
      </p>
      <div className="design-tab-grid">
        {designTemplates.map((template) => (
          <div
            key={template.id}
            className={`design-tab-card ${
              localSelectedDesign === template.id ? "selected" : ""
            }`}
            onClick={() => handleDesignSelect(template.id)}
            style={{
              borderColor:
                localSelectedDesign === template.id ? template.color : "#ddd",
            }}
          >
            <div
              className="design-tab-preview"
              style={{
                background: template.gradient || template.color,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {template.layout === "split" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "30%",
                    height: "100%",
                    background: "rgba(0,0,0,0.2)",
                  }}
                ></div>
              )}
              {template.layout === "bordered" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "5px",
                    right: "5px",
                    bottom: "5px",
                    border: `2px solid rgba(255,255,255,0.7)`,
                    borderRadius: "2px",
                  }}
                ></div>
              )}
              {template.layout === "horizontal" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "70%",
                    width: "100%",
                    height: "30%",
                    background: "rgba(0,0,0,0.2)",
                  }}
                ></div>
              )}
              {template.layout === "centered" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    height: "60%",
                    border: "2px solid rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                  }}
                ></div>
              )}
            </div>
            <p className="design-tab-name">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { designTemplates, getDesignStyle };
export default DesignTab;
