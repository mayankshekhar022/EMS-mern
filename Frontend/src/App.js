import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import Footer from './Footer';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  }, []);

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prevEmployees => prevEmployees.map(employee => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const clearSelection = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container mt-5">
      <h1>Employee Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <EmployeeForm
            onAddEmployee={addEmployee}
            onUpdateEmployee={updateEmployee}
            selectedEmployee={selectedEmployee}
            onClearSelection={clearSelection}
          />
        </div>
        <div className="col-md-6">
          <EmployeeTable
            employees={employees}
            onDeleteEmployee={deleteEmployee}
            onSelectEmployee={selectEmployee}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
