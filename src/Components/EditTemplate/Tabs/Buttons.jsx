import "./Buttons.css";
const Buttons = () => {
  // Function to copy signature to clipboard
  const copyToClipboard = () => {
    const html = generateSignatureHTML();

    // Use the Clipboard API to copy HTML content
    navigator.clipboard
      .writeText(html)
      .then(() => {
        alert("Signature copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy to clipboard. Please try again.");
      });
  };
  const downloadHTML = () => {
    const html = generateSignatureHTML();

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: "text/html" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-signature.html";

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <>
      {/* <div className="action-buttons">
        <button className="btns btns-primary" onClick={copyToClipboard}>
          <span className="btns-icon">📋</span> Copy to Clipboard
        </button>
        <button className="btns btns-secondary" onClick={downloadHTML}>
          <span className="btns-icon">⬇️</span> Download HTML
        </button>
      </div> */}
    </>
  );
};

export default Buttons;
