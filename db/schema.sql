DROP DATABASE IF EXISTS department_manager;

CREATE DATABASE department_manager;

USE department_manager;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INT NOT NULL,
    department_name VARCHAR(20) NOT NULL,
);

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    employee_id INT NOT NULL,
    employee_name VARCHAR(20) NOT NULL,
    department_id INT NOT NULL,
    salary INT NOT NULL,
);

DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    role_id INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,
);