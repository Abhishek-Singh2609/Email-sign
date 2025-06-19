// import React from "react";
// import RichTextEditor from "./RichTextEditor";
// import "./DisclaimerTab.css";

// const DisclaimerTab = ({ formData, handleFormDataUpdate }) => {
//   // Handle input changes for disclaimer
//   const handleInputChange = (value) => {
//     handleFormDataUpdate({ disclaimer: value });
//   };

//   return (
//     <div className="disclaimer-tab-form">
//       <div className="disclaimer-tab-section">
//         <label className="disclaimer-tab-label" htmlFor="disclaimer">
//           Disclaimer
//         </label>
//         <RichTextEditor
//           value={formData.disclaimer}
//           onChange={handleInputChange}
//           placeholder="Enter your disclaimer text here..."
//         />
//       </div>
//     </div>
//   );
// };

// export default DisclaimerTab;

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./DisclaimerTab.css";

const DisclaimerTab = ({ formData, handleFormDataUpdate }) => {
  // Handle input changes for disclaimer
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    handleFormDataUpdate({ disclaimer: data });
  };

  return (
    <div className="disclaimer-tab-form">
      <div className="disclaimer-tab-section">
        <label className="disclaimer-tab-label" htmlFor="disclaimer">
          Disclaimer
        </label>
        <CKEditor
          editor={ClassicEditor}
          data={formData.disclaimer || ""}
          onChange={handleEditorChange}
          config={{
            placeholder: "Enter your disclaimer text here...",
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          }}
        />
      </div>
    </div>
  );
};

export default DisclaimerTab;