const fields = [
  { type: "text", label: "First Name", name: "firstName" },
  // { type: "text", label: "last Name", name: "lasttName" },
  {
    type: "select",
    label: "City",
    name: "city",
    options: ["Ahmadabad", "Rajkot", "Surat"],
  },
  {
    type: "radio",
    label: "Gender",
    name: "gender",
    options: ["Male", "Female", "Other"],
  },
  { type: "textarea", label: "Description", name: "message" },
  { type: "checkbox", label: "Terms and Conditions", name: "terms" },

  { type: "file", label: "Enter File", name: "file" },
];

export default fields;
