import React from "react";
import { Form } from "react-bootstrap";

const CheckboxField = ({ label, name, checked = false, onChange, error }) => {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Check
        type="checkbox"
        label={label}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
};

export default CheckboxField;
