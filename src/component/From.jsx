import React, { useRef, useState } from "react";
import {
  Form as BootstrapForm,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import headers from "./coman/Heder";
import TableComponent from "./Table";
import fields from "./coman/Fields";
import validateForm from "./coman/Validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "./coman/Toast"; 


function Form() {
  const [item, setItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const fileInputRef = useRef(null);

  const defaultFormState = {
    firstName: "",
    lasttName: "",
    email: "",
    age: "",
    city: "",
    gender: "",
    terms: false,
    file: null,
    filePreview: null,
    fileType: "",
    message: "",
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [inputValue, setInputValue] = useState(defaultFormState);


  


 const handleChange = (e) => {
   const { name, type, checked, files, value } = e.target;

   if (type === "file") {
     const file = files[0];

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
   } else {
     setInputValue((prev) => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value,
     }));
   }

   setErrors((prevErrors) => {
     const newErrors = { ...prevErrors };
     if (newErrors[name]) {
       delete newErrors[name];
     }
     return newErrors;
   });
 };



  const handleEdit = (index) => {
    const selectedItem = item[index];
    const fileType = selectedItem.file
      ? selectedItem.file.type.split("/")[0]
      : "";

    setInputValue({
      ...selectedItem,
      fileType: fileType,
      filePreview:
        fileType === "image" ? URL.createObjectURL(selectedItem.file) : null,
    });

    setEditIndex(index);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
  e.preventDefault();


  const validationErrors = validateForm(inputValue);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  if (editIndex !== null) {
    const updatedItems = [...item];
    updatedItems[editIndex] = inputValue;
    setItem(updatedItems);
    setEditIndex(null);
       showToast.success("Data updated successfully!");
  } else {
    setItem([...item, inputValue]);
    showToast.success("Data submitted successfully!");
  }

 
  setInputValue(defaultFormState);
  setErrors({});
  setShowModal(false);
  e.target.reset();
};


  const handleDelet = (index) => {
    setDeleteIndex(index);
    setDeleteItemName(item[index].firstName);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedItems = [...item];
    updatedItems.splice(deleteIndex, 1);
    setItem(updatedItems);
    setShowDeleteModal(false);
   showToast.error("Data deleted successfully!"); 
  };

  return (
    <Container>
      <div className="d-flex justify-content-between my-4">
        <h2>User Form</h2>
        <Button
          variant="primary"
          onClick={() => {
            setInputValue(defaultFormState);
            setEditIndex(null);
            setShowModal(true);
          }}
        >
          New Data
        </Button>
      </div>

      <h3 className="text-center my-4">User List</h3>
      <TableComponent
        header={headers}
        item={item}
        handleEdit={handleEdit}
        handleDelet={handleDelet}
      />
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setInputValue(defaultFormState);
          setErrors({});
          setEditIndex(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit Data" : "New Data"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm onSubmit={handleSubmit}>
            <Row>
              {fields.map((field, index) => (
                <Col md={6} key={index} className="mb-3">
                  <BootstrapForm.Group>
                    {field.type !== "Checkbox" && (
                      <BootstrapForm.Label>{field.label}</BootstrapForm.Labgel>
                    )}

                    {field.type === "select" ? (
                      <BootstrapForm.Select
                        name={field.name}
                        value={inputValue[field.name]}
                        onChange={handleChange}
                        className={errors[field.name] ? "is-invalid" : ""}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </BootstrapForm.Select>
                    ) : field.type === "radio" ? (
                      <>
                        {field.options.map((option, i) => (
                          <div key={i} className="form-check">
                            <BootstrapForm.Check
                              type="radio"
                              label={option}
                              name={field.name}
                              value={option}
                              checked={inputValue[field.name] === option}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                      </>
                    ) : field.type === "Checkbox" ? (
                      <BootstrapForm.Check
                        type="checkbox"
                        label={field.label}
                        name={field.name}
                        checked={inputValue[field.name]}
                        onChange={handleChange}
                      />
                    ) : field.type === "file" ? (
                      <>
                        {!inputValue.file ? (
                          <div className="file-upload-container">
                            <input
                              type="file"
                              name={field.name}
                              onChange={handleChange}
                              ref={fileInputRef}
                              className="d-none"
                            />
                            <div
                              className="file-drop-area p-3 border border-dashed text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => fileInputRef.current.click()}
                            >
                              <span style={{ color: "#034694" }}>
                                Upload your file
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <p>
                              <p style={{ color: "blue" }}>
                                <span>
                                  <strong style={{ color: "black" }}>
                                    File:
                                  </strong>{" "}
                                </span>
                                {inputValue.file.name.substring(0, 25)}...
                              </p>
                            </p>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 14px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                                onClick={() => {
                                  setInputValue({
                                    ...inputValue,
                                    file: null,
                                    filePreview: null,
                                    fileType: "",
                                  });
                                  showToast.error("File removed successfully!");
                                }}
                              >
                                Remove File
                              </button>
                              <button
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 14px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    URL.createObjectURL(inputValue.file),
                                    "_blank"
                                  );
                                }}
                              >
                                Preview
                              </button>
                              <button
                                style={{
                                  backgroundColor: "gray",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 14px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                                onClick={(e) => {
                                  // e.stopPropagation();
                                  alert(2)
                                  e.preventDefault();
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                    fileInputRef.current.click();
                                  }
                                }}
                              >
                                Change File
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : field.type === "textarea" ? (
                      <BootstrapForm.Control
                        as="textarea"
                        name={field.name}
                        placeholder={`Enter ${field.label}`}
                        value={inputValue[field.name]}
                        onChange={handleChange}
                        className={errors[field.name] ? "is-invalid" : ""}
                      />
                    ) : (
                      <BootstrapForm.Control
                        type={field.type}
                        name={field.name}
                        placeholder={`Enter ${field.label}`}
                        value={inputValue[field.name]}
                        onChange={handleChange}
                        className={errors[field.name] ? "is-invalid" : ""}
                      />
                    )}

                    {errors[field.name] && (
                      <div className="text-danger">{errors[field.name]}</div>
                    )}
                  </BootstrapForm.Group>
                </Col>
              ))}
              <hr />
            </Row>
            <div className="text-center">
              <Button type="submit" variant="success">
                {editIndex !== null ? "Update" : "Submit"}
              </Button>
            </div>
          </BootstrapForm>
        </Modal.Body>
      </Modal>

      
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure {deleteItemName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Form;
