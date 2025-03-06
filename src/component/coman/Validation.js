const validateForm = (inputValue) => {
  let errors = {};
  if (!inputValue.firstName.trim()) {
    errors.firstName = "First Name is required";
  } else if (inputValue.firstName.length < 8) {
    errors.firstName = "First Name must be at least 8 characters long";
  } else if (!/^[A-Z]/.test(inputValue.firstName)) {
    errors.firstName = "First Name must start with a capital letter";
  }
  if (!inputValue.lasttName.trim()){
    errors.lasttName = "Last Name is required";
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
  }
  if (!inputValue.message.trim()) {
    errors.message = "Description is required";
  }

  return errors;
};

export default validateForm;
