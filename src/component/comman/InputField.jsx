import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({
  label,
  name,
  value = "",
  onChange,
  error,
  type = "text",
}) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
      className={error ? "is-invalid" : ""}
    />
    {error && <div className="text-danger">{error}</div>}
  </Form.Group>
);

export default InputField;
