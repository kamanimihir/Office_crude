import React, { useState } from "react";
import { Table as BootstrapTable, Modal, Button, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import showToast from "./comman/Toast";

const Table = ({ header = [], items = [], handleEdit, setItems }) => {
  const [deleteData, setDeleteData] = useState({ show: false, index: null });

  const handleDelete = (index) => setDeleteData({ show: true, index });
  const confirmDelete = () => {
    setItems(items.filter((_, i) => i !== deleteData.index));
    setDeleteData({ show: false });
    showToast.error("Data deleted successfully!");
  };
  const toggleStatus = (index) =>
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: !item.status } : item
      )
    );

  return (
    <>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <BootstrapTable striped bordered hover>
          <thead>
            <tr>
              {header.map((col, i) => (
                <th key={i}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {header.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ maxWidth: "120px", overflow: "auto" }}
                  >
                    {col.key === "terms" ? (
                      row[col.key] ? (
                        "True"
                      ) : (
                        "False"
                      )
                    ) : col.key === "file" && row[col.key] ? (
                      <a
                        href={URL.createObjectURL(row[col.key])}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row[col.key].type?.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(row[col.key])}
                            width="50"
                            height="50"
                            alt="Uploaded"
                          />
                        ) : (
                          row[col.key].name
                        )}
                      </a>
                    ) : col.key === "status" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Form.Check
                          type="switch"
                          checked={row.status || false}
                          onChange={() => toggleStatus(rowIndex)}
                        />
                        <span>{row.status ? "Enabled" : "Disabled"}</span>
                      </div>
                    ) : col.key === "actions" ? (
                      <>
                        {col.actions.includes("edit") && (
                          <PencilSquare
                            size={22}
                            color="blue"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() => handleEdit(rowIndex)}
                          />
                        )}
                        {col.actions.includes("delete") && (
                          <Trash
                            size={22}
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(rowIndex)}
                          />
                        )}
                      </>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteData.show}
        onHide={() => setDeleteData({ show: false })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteData({ show: false })}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;
