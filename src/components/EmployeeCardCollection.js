import React, { Component } from 'react';
import EmployeeCard from './EmployeeCard';

class EmployeeCardCollection extends Component {
  render() {
    const { employees, onDelete, onEdit, onSave } = this.props;

    return (
      <div className="employee-card-collection">
        <h1>Employee List</h1>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
          />
        ))}
      </div>
    );
  }
}


export default EmployeeCardCollection;
