const validateForm = (inputValue) => {
  let errors = {};

  if (!inputValue.firstName.trim()) {
    errors.firstName = "First Name is required";
  } else if (!/^[A-Z]/.test(inputValue.firstName)) {
    errors.firstName = "First Name must start with a capital letter";
  }

  if (!inputValue.city) {
    errors.city = "City is required";
  }

  if (!inputValue.gender) {
    errors.gender = "Gender is required";
  }

  if (!inputValue.terms) {
    errors.terms = "You must accept terms and conditions";
  }

  if (!inputValue.file) {
    errors.file = "File is required";
  } else {
    const allowedFormats = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedFormats.includes(inputValue.file.type)) {
      errors.file = "Only PNG, JPEG, or PDF files are allowed";
    }
    if (inputValue.file.size > 2 * 1024 * 1024) {
      errors.file = "File size must be less than 2MB";
    }
  }

  if (!inputValue.message.trim()) {
    errors.message = "Description is required";
  }

  return errors;
};

export default validateForm;
