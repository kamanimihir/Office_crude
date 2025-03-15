import React, { useRef } from "react";
import showToast from "../comman/Toast";

const FileUpload = ({ inputValue, setInputValue, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type.split("/")[0];

      setInputValue((prev) => ({
        ...prev,
        file: file,
        fileType: fileType,
        filePreview: fileType === "image" ? URL.createObjectURL(file) : null,
      }));

      showToast.success("File uploaded successfully!");
    } else {
      showToast.error("No file selected! Please upload a valid file.");
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setInputValue((prev) => ({
      ...prev,
      file: null,
      filePreview: null,
      fileType: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    showToast.error("File removed successfully!");
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className={`form-control ${inputValue.file ? "d-none" : ""}`}
      />

      {inputValue.file && (
        <div className="mt-3 p-3">
          <p className="mb-2">
            <strong>File:</strong> {inputValue.file.name}
          </p>

          <div className="d-flex flex-wrap gap-2">
            <button onClick={handleRemoveFile} className="btn btn-danger">
              Remove
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(URL.createObjectURL(inputValue.file), "_blank")
              }
              className="btn btn-info"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleChangeFile}
              className="btn btn-warning"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default FileUpload;
