const headers = [
  { name: "First Name", key: "firstName" },
  { name: "City", key: "city" },
  { name: "Gender", key: "gender" },
  { name: "Accepted Terms", key: "terms" },
  { name: "Description", key: "message" },
  { name: "File", key: "file" },
  { name: "Status", key: "status" }, // Enable/Disable Switch
  { name: "Actions", key: "actions", actions: ["edit", "delete"] },
];

export default headers;
