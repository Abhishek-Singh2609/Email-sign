import React, { useEffect, useRef } from "react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false); // Prevents multiple script loads

  useEffect(() => {
    const loadCKEditor = async () => {
      if (scriptLoaded.current) {
        initEditor(); // Initialize directly if script is already loaded
        return;
      }

      scriptLoaded.current = true; // Mark script as loaded

      const script = document.createElement("script");
      script.src =
        "https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js";
      script.async = true;
      script.onload = initEditor;
      document.body.appendChild(script);

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    };

    const initEditor = async () => {
      if (!containerRef.current || editorRef.current || !window.ClassicEditor)
        return;

      try {
        editorRef.current = await window.ClassicEditor.create(
          containerRef.current,
          {
            placeholder: placeholder || "Enter your text here...",
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo",
            ],
          }
        );

        editorRef.current.setData(value || "");

        editorRef.current.model.document.on("change:data", () => {
          const data = editorRef.current.getData();
          onChange(data);
        });
      } catch (error) {
        console.error("Error initializing CKEditor:", error);
      }
    };

    loadCKEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ padding: "8px" }}></div>
    </div>
  );
};

export default RichTextEditor;
