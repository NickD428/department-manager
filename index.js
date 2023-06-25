const inquirer = require('inquirer');
const connection = require('./connection');
const express = require('express');
const mysql = require('mysql2');

app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'schema.sql',
});

function displayMenu() {
    inquirer
      .prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
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
          case 'Exit':
            connection.end();
            break;
          default:
            console.log('Invalid choice. Please select a valid option.');
        }
      });
    }
    function viewDepartments() {
      connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        displayMainMenu();
      });
    }

    function viewRoles() {
      const query = `
        SELECT roles.title, roles.id, departments.name AS department, roles.salary
        FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
      `;
      connection.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        displayMainMenu();
      });
    }

