import React from "react";
import { Form } from "react-bootstrap";

const SelectField = ({
  label,
  name,
  value = "",
  onChange,
  error,
  options = [],
}) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Select
      name={name}
      value={value}
      onChange={onChange}
      className={error ? "is-invalid" : ""}
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
    {error && <div className="text-danger">{error}</div>}
  </Form.Group>
);

export default SelectField;
