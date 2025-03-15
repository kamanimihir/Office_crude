// coman/toastMessages.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warning(message),
};

export default showToast;
