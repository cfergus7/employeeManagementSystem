var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: ""
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    start();
});
// Build a command-line application that at a minimum allows the user to:
function start(){
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices:[
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
        .then(function(answer){
            switch (answer.action){
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

                case "Update employee roles"
                    updateRole();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        })
}






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