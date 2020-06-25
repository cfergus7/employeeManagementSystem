USE employee_db;

INSERT INTO departments (department)
VALUES ("Manager");

INSERT INTO departments (department)
VALUES ("Chef");

INSERT INTO departments (department)
VALUES ("Bartender");

INSERT INTO departments (department)
VALUES ("Server");

INSERT INTO departments (department)
VALUES ("Cook");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Chef", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Server", 65000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Bartender", 85000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Cook", 45000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zach", 'Izzard', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zack', 'Evans', 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Laura', 'Kellog', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Chris', 'Swan', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('James', 'Goad', 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Teresa', 'Patrick', 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Deangelo', 'Williams', 5, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maria', 'Fuentez', 5, 2);


