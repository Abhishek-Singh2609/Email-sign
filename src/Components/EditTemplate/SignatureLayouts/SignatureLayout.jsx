import React from "react";
import SplitLayout from "./SplitLayout";
import CenteredLayout from "./CenteredLayout";
import HorizontalLayout from "./HorizontalLayout";
import BorderedLayout from "./BorderedLayout";
import StandardLayout from "./StandardLayout";
import { designTemplates } from "../Tabs/DesignTab";
import ProfessionalLayout from "./ProfessionalLayout";
import TextLayout from "./TextLayout";
import LogoLayout from "./LogoLayout";
import WithoutProfile from "./WithoutProfile";
import OrangeLayout from "./OrangeLayout";
import OrangeText from "./OrangeText";
import OrangeCenter from "./OrangeCenter";
import OrangeRight from "./OrangeRight";

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
    case "professional":
      return <ProfessionalLayout formData={formData} designStyle={designStyle} />;
    case "text":
      return <TextLayout formData={formData} designStyle={designStyle} />;
    case "logo":
      return <LogoLayout formData={formData} designStyle={designStyle} />;
    case "withoutProfile":
      return <WithoutProfile formData={formData} designStyle={designStyle} />;
    case "orange":
      return <OrangeLayout formData={formData} designStyle={designStyle} />;
    case "orangetext":
      return <OrangeText formData={formData} designStyle={designStyle} />;
    case "orangecenter":
      return <OrangeCenter formData={formData} designStyle={designStyle} />;
    case "orangeright":
      return <OrangeRight formData={formData} designStyle={designStyle} />;
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
