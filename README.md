# Employee CRUD

This is a simple employee management app built with React and connected to a JSON server. The app allows you to perform various operations on employee data, including viewing, deleting, and updating.

## Getting Started

### Prerequisites

Make sure you have Node.js, json-server, and npm (Node Package Manager) installed on your system.

To install json-server:
```sh
npm install -g json-server
```
Install packages
```sh
npm install
```

### Usage
1. Start the JSON server:

```sh
json-server --watch db.json --port 5000
```
ALTERNATIVELY
```sh
npm run server
```

Start The React App
```sh
npm start
```

## Features
- View a list of employees.
- Delete employees by ID.
- Fetch all employees.
- Find employees by ID and edit their information.
- Save new employees or update existing ones.

## Project Structure
- src/: Contains the React components.
- db.json: JSON file containing mock employee data for the JSON server.

## Technologies Used
- React
- JSON Server
- HTML
- CSS
