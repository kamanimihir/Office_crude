import React, { useState } from "react";
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

function Form() {
  const [item, setItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lasttName: "",
    email: "",
    age: "",
    city: "",
    gender: "",
    terms: false,
    file: null,
    message: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setInputValue((prev) => ({...prev,[name]:type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(inputValue);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (editIndex !== null) {
      const updatedItems = [...item];
      updatedItems[editIndex] = inputValue;
      setItem(updatedItems);
      setEditIndex(null);
    } else {
      setItem([...item, inputValue]);
    }

    setInputValue({
      firstName: "",
      lasttName: "",
      email: "",
      age: "",
      city: "",
      gender: "",
      terms: false,
      file: null,
      message: "",
    });

    setErrors({});
  };

  const handleEdit = (index) => {
    setInputValue(item[index]);
    setEditIndex(index);
  };

  const handleDelet = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedItems = [...item];
    updatedItems.splice(deleteIndex, 1);
    setItem(updatedItems);
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <h2 className="text-center my-4">User Form</h2>
      <BootstrapForm onSubmit={handleSubmit}>
        <Row>
          {fields.map((field, index) => (
            <Col md={6} key={index} className="mb-3">
              <BootstrapForm.Group>
                {field.type !== "Checkbox" && (
                  <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
                )}

                {field.type === "select" ? (
                  <BootstrapForm.Select
                    name={field.name}
                    value={inputValue[field.name]}
                    onChange={handleChange}
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
                  <BootstrapForm.Control
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                  />
                ) : field.type === "textarea" ? (
                  <BootstrapForm.Control
                    as="textarea"
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={inputValue[field.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <BootstrapForm.Control
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={inputValue[field.name]}
                    onChange={handleChange}
                  />
                )}

                {errors[field.name] && (
                  <Alert variant="danger" className="mt-1">
                    {errors[field.name]}
                  </Alert>
                )}
              </BootstrapForm.Group>
            </Col>
          ))}
        </Row>

        <div className="text-center">
          <Button
            type="submit"
            variant={editIndex !== null ? "warning" : "primary"}
          >
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </div>
      </BootstrapForm>

      <h3 className="text-center my-4">User List</h3>
      <TableComponent
        header={headers}
        item={item}
        handleEdit={handleEdit}
        handleDelet={handleDelet}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
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
