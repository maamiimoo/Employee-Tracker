//dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const chalk = require("chalk");




const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "EmployeeTracker_DB",
});

connection.connect(err => {
    if (err) {
      console.log(chalk.white.bgRed(err));
      return;
    }
    console.log(chalk.magenta(`Connected to db. ThreadID: ${connection.threadId}`));
    start();

    
  });

// prompt user for action
function start() {
   inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
    "View All departments",
    "View All employees",
    "View All roles",
    "Add roles",
    "Add departments",
    "Add employees",
    "Delete roles",
    "Delete departments",
    "Exit"
      ]
    })
    .then(function(res) {  
      switch (res.action) {
        case "View departments":
          viewDep();
          break;
  
        case "View All employees":
          viewEmp();
          break;
  
        case "View All roles":
          viewRole();
          break;
  
        case "Add roles":
          addRole();
          break;
  
        case "Add departments":
          addDep();
          break;

        case "Add employees":
          addEmp();
          break;

        case "Update employee roles":
          updateEmpRole();
          break;
        
        case "Delete roles":
          deleteRole();
          break;
        
        case "Delete departments":
          deleteDep();
          break;
        
        case "Exit":
          end();
          break
        }
      });
  }


// View Department

function viewDep() {
  console.log("Selecting departments: \n");
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}


//view employee


function viewEmp(){
  console.log("Selecting employees...\n");
  connection.query("SELECT * FROM employees", function(error, res) {
    console.table(res);
    start();
  });

}

// view role
function viewRole() {
  console.log("Selecting roles...\n");
  connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
  });
}

//adding a new role
function addRole(_data) {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please type in name of new role"
        
      },
      {
        name: "id",
        type: "input",
        message: "What id postion is your new role in"
        
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of new role?",
        
      },
      {
        name: "department_id",
        type: "list",
        message: "Which department is the new role in?",
      },
    ])
    .then(function(res) {
      connection.query(
      "INSERT INTO roles SET ?",
      {
        title: res.name,
        salary: res.salary,
        id: res.id,
        department_id: res.id
      },
      function(error, _res) {
        console.log(error);
        if (error) throw error;
      }
    );
  })
  .then(function() {
    console.log(`--This role has been added!--`);
  })
  .then(function() {
    start();
  });
}

//adding new employee 
function addEmp(data) {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee first name?"
        
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee last Name?"
        
      },
      {
        name: "id",
        type: "input",
        message: "What is the employee's id number?"
      },

      {
        name: "role_id",
        type: "input",
        message: "What is the position identification you would like to submit?"
      }
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.first_name,
          last_name: res.last_name,
          id: res.id,
          role_id: res.role_id
        },
        function (err) {
          if (err) throw err;
          console.log("New Position Submitted successfully!");
          start();
        }
      );
    })
}
//adding new Department
 

// Delete Department

// Delete Role

// Delete Employees

// Update employee roles 


//exiting application
function end() {
  console.log("Goodbye!");
  connection.end();
  process.exit();
}
