USE department_manager;

-- Insert departments
INSERT INTO departments (department_id, department_name) VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Human Resources'),
  (4, 'Finance');

-- Insert roles
INSERT INTO roles (role_id, role_name, salary, department_id) VALUES
  (1, 'Sales Representative', 50000, 1),
  (2, 'Sales Manager', 80000, 1),
  (3, 'Marketing Coordinator', 45000, 2),
  (4, 'Marketing Manager', 70000, 2),
  (5, 'HR Specialist', 40000, 3),
  (6, 'HR Manager', 65000, 3),
  (7, 'Accountant', 55000, 4),
  (8, 'Financial Analyst', 75000, 4);

-- Insert employees
INSERT INTO employees (employee_id, employee_first_name, employee_last_name, employee_title, department_id, manager_name) VALUES
  (1, 'John', 'Doe', 'Sales Manager', 1, 'Jane Smith'),
  (2, 'Jane', 'Smith', 'Marketing Manager', 2, 'John Doe'),
  (3, 'Michael', 'Johnson', 'Sales Representative', 1, 'John Doe'),
  (4, 'Emily', 'Davis', 'HR Manager', 3, 'Jane Smith'),
  (5, 'David', 'Wilson', 'HR Specialist', 3, 'Emily Davis'),
  (6, 'Sarah', 'Anderson', 'Financial Analyst', 4, 'Jane Smith'),
  (7, 'Daniel', 'Lee', 'Accountant', 4, 'Sarah Anderson');