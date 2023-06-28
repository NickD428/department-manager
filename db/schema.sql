DROP DATABASE IF EXISTS department_manager;

CREATE DATABASE department_manager;

USE department_manager;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_first_name VARCHAR(20) NOT NULL,
    employee_last_name VARCHAR(20) NOT NULL,
    employee_title VARCHAR(20) NOT NULL,
    department_id INT NOT NULL,
    manager_name VARCHAR(20) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);