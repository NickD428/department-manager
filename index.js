const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'department_manager_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        default:
          console.log('Invalid choice.');
          mainMenu();
          break;
      }
    });
}

function viewAllDepartments() {
  const query = 'SELECT department_id, department_name FROM departments';
  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainMenu();
  });
}

function viewAllRoles() {
  const query =
    'SELECT roles.role_id, roles.role_name, roles.salary, departments.department_name ' +
    'FROM roles ' +
    'INNER JOIN departments ON roles.department_id = departments.department_id';
  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainMenu();
  });
}

function viewAllEmployees() {
  const query =
    'SELECT employees.employee_id, employees.employee_first_name, employees.employee_last_name, ' +
    'employees.employee_title, departments.department_name, employees.manager_name ' +
    'FROM employees ' +
    'INNER JOIN departments ON employees.department_id = departments.department_id';
  connection.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainMenu();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO departments (department_id, department_name) VALUES (DEFAULT, ?)';
      connection.query(query, [answers.departmentName], (err) => {
        if (err) throw err;

        console.log('Department added successfully.');
        mainMenu();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO roles (role_id, role_name, salary, department_id) VALUES (DEFAULT, ?, ?, ?)';
      connection.query(query, [answers.roleName, answers.salary, answers.departmentId], (err) => {
        if (err) throw err;

        console.log('Role added successfully.');
        mainMenu();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'title',
        message: "Enter the employee's title:",
      },
      {
        type: 'input',
        name: 'departmentId',
        message: "Enter the department ID for the employee:",
      },
      {
        type: 'input',
        name: 'managerName',
        message: "Enter the employee's manager's name:",
      },
    ])
    .then((answers) => {
      const query =
        'INSERT INTO employees (employee_id, employee_first_name, employee_last_name, ' +
        'employee_title, department_id, manager_name) VALUES (DEFAULT, ?, ?, ?, ?, ?)';
      connection.query(
        query,
        [answers.firstName, answers.lastName, answers.title, answers.departmentId, answers.managerName],
        (err) => {
          if (err) throw err;

          console.log('Employee added successfully.');
          mainMenu();
        }
      );
    });
}

