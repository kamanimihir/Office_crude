import "bootstrap/dist/css/bootstrap.min.css";
// import Table from "./component/Table";
import { ToastContainer } from "react-toastify";
// import { Form } from "react-bootstrap";
import From from "./component/From";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <From />
    </>
  );
}

export default App;
