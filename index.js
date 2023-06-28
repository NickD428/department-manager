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

