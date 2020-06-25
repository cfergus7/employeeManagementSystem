var mysql = require("mysql");
var inquirer = require("inquirer");
const path = require("path");
// const cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    start();
});
// Build a command-line application that at a minimum allows the user to:
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add roles",
                "Add employees",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                //   * Add departments
                case "Add department":
                    addDepartment();
                    break;
                    // Add roles
                case "Add roles":
                    addRoles();
                    break;
                    // Add employees
                case "Add employees":
                    addEmployees();
                    break;
                    // View departments
                case "View departments":
                    viewDepartments();
                    break;
                    // View roles
                case "View roles":
                    viewRoles();
                    break;
                
                case "View  Employees":
                    viewEmployees();
                    break;

                case "Update employee roles":
                updateRole();
                break;

                case "exit":
                    connection.end();
                    break;
            }
        })
}

function addDepartment() {
    inquirer
        .prompt([{
            type: "input",
            message: "Enter the department ",
            name: "name"
        }
    ])
    .then(function (res){
        connection.query(
            "INSERT INTO department SET ?",{
                name: res.name
            },
            function (err, res){
                if (err) {
                    throw err;
                }
                console.table(res);
            }        
        )
    })
    start();
};

function addRoles() {
    inquirer
        .prompt([{
            type: "input",
            message: "Enter the employee title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the employee salary",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter the employee department id",
            name: "department_id"
        }
    ])
    .then(function (res){
        connection.query(
            "INSERT INTO role SET ?", {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
            }
        );
        start();
    })
};

function addEmployees() {
    inquirer
        .prompt([{
                type: "input",
                message: "Enter employee first name",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "last_name"
            },
            {
                type: "input",
                message: "Enter employee role_id",
                name: "role_id"
            },
            {
                type: "input",
                message: "Enter employee manager_id",
                name: "manager_id"
            }
        ])
        .then(function (answer) {
            if (answer.first_name === '' || answer.last_name === '' || answer.role_id === '' || answer.manager_id === '') {
                console.log("Enter a response for all fields or go back to main menu.");
                inquirer
                .prompt({
                    type: "list",
                    message: "Enter a response for all fields or go back to main menu.",
                    name: "choices",
                    choices: [
                        "Add Employee",
                        "Main Menu"
                    ]
                })
                .then (function (res)   {
                    if (res.choices === "Add Employee")    {
                        addEmployees();
                    }   else    {
                        start();
                    }
                })
                
            } else {
                connection.query("INSERT INTO employee SET ?",
                    { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id }, function (err, res) {
                        if (err) throw err;
                        console.log("\n Database with added employee. \n");
                        viewEmployees();
                    })
            } 
        })
}

// function viewDepartments() {
//     connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
//         if (err) throw err;
//         console.log("\n All employees retrieved from database by department. \n");
//         console.table(res);
//         start();
//     });
// };

// function viewEmployees(){
//     connection.query("SELECT first_name, last_name, employee.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
//         if (err) throw err;
//         console.log("\n All employees retrieved from database by department. \n");
//         console.table(res);
//         start();
//     });
// };

// function viewRoles() {
//     connection.query("SELECT first_name, last_name, role.title FROM((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
//         if (err) throw err;
//         console.log("\n All employees retrieved from database by role. \n");
//         console.table(res);
//         start();
//     });
// };

function viewEmployees() {
    connection.query("SELECT first_name, last_name, department.name, role.title, role.salary FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database. \n");
        console.table(res);
        start();
    });
};
//view all employees in database by department
//need to join with other tables
function viewDepartments() {
    connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by department. \n");
        console.table(res);
        start();
    });
};
//view all employees in database by role
//need to join with other tables
function viewRoles() {
    connection.query("SELECT first_name, last_name, role.title FROM((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by role. \n");
        console.table(res);
        start();
    });
};

function updateRole() {
console.log("works")
};






//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers
// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

//   * View employees by manager

//   * Delete departments, roles, and employees
//   TRUNCATE TABLE table_name;

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// SELECT SUM(column_name)
// FROM table_name
// WHERE condition;

