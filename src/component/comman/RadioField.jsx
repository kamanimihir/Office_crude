import React from "react";
import { Form } from "react-bootstrap";

const RadioField = ({ label, name, value, onChange, options = [], error }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      {options.map((option) => (
        <div key={option} className="form-check">
          <Form.Check
            type="radio"
            label={option}
            name={name}
            value={option}
            checked={value === option} 
            onChange={(e) => onChange(e)} 
          />
        </div>
      ))}
    {error && <div className="text-danger">{error}</div>}
    </Form.Group>
    
    
  );
};

export default RadioField;
