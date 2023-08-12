import React, { Component } from 'react';
import EmployeeCardCollection from "./components/EmployeeCardCollection";
import './App.scss';
import db from './db.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: db.employees,
      selectedEmployeeId: '',
      isEditing: false,
      editorId: '',
      editorName: '',
      editorTitle: '',
      editorAvatarURL: '',
      isDeleted: false,
      error: '',
    };
        this.cardRef = React.createRef();
  }


  componentDidMount() {
    this.fetchData();
   // Add a click event listener to the document
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    // Remove the click event listener when the component unmounts
    document.removeEventListener("click", this.handleDocumentClick);
  }

   handleDocumentClick = (event) => {
    const { isEditing } = this.state;
    const clickedElement = event.target;

    // Check if the clicked element is not within the card element
    if (isEditing && this.cardRef.current && !this.cardRef.current.contains(clickedElement)) {
      this.setState({ isEditing: false });
    }
  };


  fetchData = () => {
    fetch("")
      .then((response) => response.json())
      .then((data) => this.setState({ employees: data }));
  };

  handleDelete = (employeeId) => {
  const updatedEmployees = this.state.employees.filter(
    (employee) => employee.id !== employeeId
  );
  this.setState({ employees: updatedEmployees });
};

 handleEdit = (employee) => {
    this.setState({
      editorId: employee.id,
      editorName: employee.name,
      editorTitle: employee.title,
      editorAvatarURL: employee.avatarURL,
      error: '',
    });
  };

  handleGetAll = () => {
    this.fetchData();
  };

  handleFindById = () => {
    const { employees, editorId } = this.state;
    const selectedEmployee = employees.find(
      (employee) => employee.id === parseInt(editorId)
    );

    if (selectedEmployee) {
      this.setState({
        editorId: selectedEmployee.id,
        editorName: selectedEmployee.name,
        editorTitle: selectedEmployee.title,
        editorAvatarURL: selectedEmployee.avatarURL,
        error: "",
      });
    } else {
      this.setState({
        editorName: "",
        editorTitle: "",
        editorAvatarURL: "",
        error: "Employee not found.",
      });
    }
  };

   handleSave = (id, editedName, editedTitle, editedAvatarURL) => {
    const { employees } = this.state;
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return {
          ...employee,
          name: editedName,
          title: editedTitle,
          avatarURL: editedAvatarURL,
        };
      }
      return employee;
    });

    this.setState({ employees: updatedEmployees });
  };
handleFindByName = (event) => {
  const searchValue = event.target.value;
  const { employees } = this.state;

  if (searchValue === '') {
    // If the search input is empty, show all employees
    this.fetchData();
  } else {
    // Filter employees by name
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    this.setState({ employees: filteredEmployees, editorName: searchValue, error: '' });
  }
};



handleCreateNew = () => {
  const { employees } = this.state;

  // Create a new empty employee card
  const newEmployee = {
    id: '',
    name: '',
    title: '',
    avatarURL: '',
  };

  this.setState({
    employees: [...employees, newEmployee],
    editorId: '',
    editorName: '',
    editorTitle: '',
    editorAvatarURL: '',
    error: '',
  });
};

  renderEditor() {
    const {
      editorName,
      editorTitle,
      editorAvatarURL,
    } = this.state;

    return (
      <div className="editor">
        <label htmlFor="editorName">Name:</label>
        <input
          type="text"
          id="editorName"
          value={editorName}
          onChange={(event) =>
            this.setState({ editorName: event.target.value })
          }
          placeholder="Name"
        />
        <label htmlFor="editorTitle">Title:</label>
        <input
          type="text"
          id="editorTitle"
          value={editorTitle}
          onChange={(event) =>
            this.setState({ editorTitle: event.target.value })
          }
          placeholder="Title"
        />
        <label htmlFor="editorAvatarURL">Avatar URL:</label>
        <input
          type="text"
          id="editorAvatarURL"
          value={editorAvatarURL}
          onChange={(event) =>
            this.setState({ editorAvatarURL: event.target.value })
          }
          placeholder="Avatar URL"
        />
        <button onClick={this.handleSave} className='save-btn'>Save</button>
      </div>
    );
  }

  render() {
    const {
      employees,
      error,
    } = this.state;

    return (
      <div className="app">
        <div className="search-bar">
          <button onClick={this.handleGetAll}>Find All</button>
          <input
  type="text"
  value={this.state.editorName}
  onChange={this.handleFindByName}
  placeholder="Search by Name"
/>

          <button onClick={this.handleFindByName}>Search</button>
          <button onClick={this.handleCreateNew}>New</button>
        </div>
         <div ref={this.cardRef}>
          <EmployeeCardCollection
            employees={employees}
            onDelete={this.handleDelete}
            onSave={this.handleSave}
            onEdit={this.handleEdit}
          />
        </div>
        {this.renderEditor()}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default App;
