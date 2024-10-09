import React from 'react';
import axios from 'axios';

const EmployeeTable = ({ employees, onDeleteEmployee, onSelectEmployee }) => {
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => onDeleteEmployee(id))
      .catch(error => console.error(error));
  };

  
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Employee List</h2>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <button type="button" className="btn btn-warning me-2" onClick={() => onSelectEmployee(employee)}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
