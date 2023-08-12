import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class EmployeeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedName: this.props.employee.name,
      editedTitle: this.props.employee.title,
      editedAvatarURL: this.props.employee.avatarURL,
    };
  }

  handleCardClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = () => {
    const { editedName, editedTitle, editedAvatarURL } = this.state;
    const { employee, onSave } = this.props;

    onSave({
      ...employee,
      name: editedName,
      title: editedTitle,
      avatarURL: editedAvatarURL,
    });

    this.setState({ isEditing: false });
  };

  render() {
    const { employee, onDelete } = this.props;
    const { isEditing, editedName, editedTitle, editedAvatarURL } = this.state;

    return (
      <div className={`employee-card ${isEditing ? 'editing' : ''}`} onClick={this.handleCardClick}>
        <img src={employee.avatarURL} alt={`${employee.name}'s avatar`} className="avatar" />
        {isEditing ? (
          <div className="edit-form">
            <label>Name:</label>
            <input
              type="text"
              value={editedName}
              onChange={(event) => this.setState({ editedName: event.target.value })}
            />
            <label>Title:</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(event) => this.setState({ editedTitle: event.target.value })}
            />
            <label>Avatar URL:</label>
            <input
              type="text"
              value={editedAvatarURL}
              onChange={(event) => this.setState({ editedAvatarURL: event.target.value })}
            />
            <button onClick={this.handleSaveClick}>Save</button>
          </div>
        ) : (
          <>
            <h2>{employee.name}</h2>
            <p>Position: {employee.title}</p>
            <div className="card-footer">
              <button className="delete-button" onClick={() => onDelete(employee.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default EmployeeCard;
