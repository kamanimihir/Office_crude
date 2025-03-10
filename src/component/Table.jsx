import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons"; 

const Table = ({ header, item, handleEdit, handleDelet }) => {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={index}>{col.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {item.map((row, index) => (
            <tr key={index}>
              {header.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    maxWidth: "80px",
                    wordWrap: "break-word",
                    overflow: "auto",
                  }}
                >
                  {col.key === "terms" ? (
                    row[col.key] ? (
                      "True"
                    ) : (
                      "False"
                    )
                  ) : col.key === "file" && row[col.key] ? (
                    row[col.key].type.startsWith("image/") ? (
                      <a
                        href={URL.createObjectURL(row[col.key])}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={URL.createObjectURL(row[col.key])}
                          alt="Uploaded"
                          width="50"
                          height="50"
                          style={{ borderRadius: "5px", cursor: "pointer" }}
                        />
                      </a>
                    ) : (
                      <a
                        href={URL.createObjectURL(row[col.key])}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row[col.key].name}
                      </a>
                    )
                  ) : (
                    <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                      {row[col.key]}
                    </div>
                  )}
                </td>
              ))}
              <td>
               
                <PencilSquare
                  size={22}
                  color="blue"
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => handleEdit(index)}
                />

                <Trash
                  size={22}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelet(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Table;
