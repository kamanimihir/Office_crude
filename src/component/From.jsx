import React, { useState } from "react";
import {
  Form as BootstrapForm,
  Button,
  Container,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import fields from "./comman/Fields";
import validateForm from "./comman/Validation";
import showToast from "./comman/Toast";
import InputField from "./comman/InputField";
import TextareaField from "./comman/TextareaField";
import FileUpload from "./comman/Fileuplod";
import CheckboxField from "./comman/CheckboxField";
import SelectField from "./comman/SelectField";
import RadioField from "./comman/RadioField";
import TableComponent from "./Table";
import headers from "./comman/Heder";
import { fetchData } from "../services/Apiservices";

const defaultFormState = {
  firstName: "",
  lastName: "",
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

function Form() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(defaultFormState);

const handleChange = (e) => {
  const { name, type, checked, files, value } = e.target;

  if (type === "file" && files.length > 0) {
    const file = files[0];
    const fileType = file.type.split("/")[0];

    setInputValue((prev) => ({
      ...prev,
      file,
      fileType,
      filePreview: fileType === "image" ? URL.createObjectURL(file) : null,
    }));

    showToast.success("File uploaded successfully!");

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.file) delete newErrors.file;
      return newErrors;
    });
  } else {
    setInputValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

   setErrors((prevErrors) => {
     const newErrors = { ...prevErrors };
     if (name === "file" && files.length > 0) {
       delete newErrors.file;
     }
     return newErrors;
   });
  }
};


  const handleEdit = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
    setShowModal(true);
  };

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    // Validate form data
//    const validationErrors = validateForm(inputValue);
//    console.log("Validation Errors:", validationErrors);
//    setErrors(validationErrors);

//    if (Object.keys(validationErrors).length > 0) {
//      showToast.error("Please fix the validation errors!");
//      return;
//    }

//    // Prepare data for API request
//    let formData = { ...inputValue };

//    if (formData.file) {
//      const reader = new FileReader();
//      reader.readAsDataURL(formData.file);
//      reader.onloadend = async () => {
//        formData.file = reader.result; // Convert file to Base64

//        // Make API request using fetchData
//        const response = await fetchData(
//          "http://localhost:5000/api/data",
//          "POST",
//          formData
//        );

//        if (response.error) {
//          showToast.error("Failed to submit data!");
//          console.error("API Error:", response.error);
//        } else {
//          showToast.success(
//            editIndex !== null
//              ? "Data updated successfully!"
//              : "Data submitted successfully!"
//          );

//          // Update local state
//          if (editIndex !== null) {
//            const updatedItems = [...items];
//            updatedItems[editIndex] = formData;
//            setItems(updatedItems);
//          } else {
//            setItems((prevItems) => [...prevItems, formData]);
//          }

//          resetForm();
//        }
//      };
//    } else {
//      // If no file, send data directly
//      const response = await fetchData(
//        "http://localhost:5000/api/data",
//        "POST",
//        formData
//      );

//      if (response.error) {
//        showToast.error("Failed to submit data!");
//        console.error("API Error:", response.error);
//      } else {
//        showToast.success(
//          editIndex !== null
//            ? "Data updated successfully!"
//            : "Data submitted successfully!"
//        );

//        // Update local state
//        if (editIndex !== null) {
//          const updatedItems = [...items];
//          updatedItems[editIndex] = formData;
//          setItems(updatedItems);
//        } else {
//          setItems((prevItems) => [...prevItems, formData]);
//        }

//        resetForm();
//      }
//    }
//  };

 const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(inputValue);
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast.error("Please fix the validation errors!");
      return;
    }

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = inputValue;
      setItems(updatedItems);
      showToast.success("Data updated successfully!");
    } else {
      setItems((prevItems) => [...prevItems, inputValue]);
      showToast.success("Data submitted successfully!");
    }

    setTimeout(() => resetForm(), 200);
  };

  const resetForm = () => {
    setInputValue(defaultFormState);
    setErrors({});
    setEditIndex(null);
    setShowModal(false);
  };

  
  const renderField = (field) => {
    const commonProps = {
      ...field,
      value: inputValue[field.name],
      onChange: handleChange,
      error: errors[field.name],
      ...(field.type === "checkbox" && { checked: inputValue[field.name] }),
    };

    // all input fields
    switch (field.type) {
      case "select":
        return <SelectField {...commonProps} />;
      case "radio":
        return <RadioField {...commonProps} />;
      case "checkbox":
        return (
          <CheckboxField {...commonProps} />
        );
      case "file":
        return (
          <FileUpload inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "textarea":
        return <TextareaField {...commonProps} />;
      default:
        return <InputField {...commonProps} />;
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between my-4">
        <h2>User Form</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          New Data
        </Button>
      </div>
    {/* table data so */}
      <h3 className="text-center my-4">User List</h3>
      <TableComponent
        header={headers} 
        items={items}
        handleEdit={handleEdit}
        setItems={setItems}
      />
{/* submit data and edite data */}
      <Modal show={showModal} onHide={resetForm} centered>
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
                    {renderField(field)}
                  </BootstrapForm.Group>
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <Button type="submit" variant="success">
                {editIndex !== null ? "Update" : "Submit"}
              </Button>
            </div>
          </BootstrapForm>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Form;
