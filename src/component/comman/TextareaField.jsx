import React from "react";
import { Form } from "react-bootstrap";

const TextareaField = ({ label, name, value = "", onChange, error }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        placeholder={`Enter ${label}`}
        value={value || ""}
        onChange={onChange}
        className={error ? "is-invalid" : ""}
      />
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
};

export default TextareaField;
