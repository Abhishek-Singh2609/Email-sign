import React from "react";
import SplitLayout from "./SplitLayout";
import CenteredLayout from "./CenteredLayout";
import HorizontalLayout from "./HorizontalLayout";
import BorderedLayout from "./BorderedLayout";
import StandardLayout from "./StandardLayout";
import { designTemplates } from "../Tabs/DesignTab";

const SignatureLayout = ({ formData, selectedDesign, designStyle }) => {
  const design = designTemplates.find((d) => d.id === selectedDesign);

  switch (design.layout) {
    case "split":
      return <SplitLayout formData={formData} designStyle={designStyle} />;
    case "centered":
      return <CenteredLayout formData={formData} designStyle={designStyle} />;
    case "horizontal":
      return <HorizontalLayout formData={formData} designStyle={designStyle} />;
    case "bordered":
      return <BorderedLayout formData={formData} designStyle={designStyle} />;
    default:
      return (
        <StandardLayout
          formData={formData}
          designStyle={designStyle}
          selectedDesign={selectedDesign}
        />
      );
  }
};

export default SignatureLayout;
