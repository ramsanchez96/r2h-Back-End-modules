// POST::localhost:3000/employees  =  Inserts new employee into your data.
// GET::localhost:3000/employees = Returns json with information from all employees.
// GET::localhost:3000/employees/:id  =  Returns json with the information from that specific employee.
// PUT::loclahost:3000/employees/:id  =  Updates information for specified employee.
// DELETE::localhost3000/employees/:id  =  Removes the employee with that ID from the data.

//npm init
const fs = require('fs');
const express = require('express'); //npm install --save express
const bodyParser = require('body-parser'); //npm install --save body-parser

const app = express();

app.use(bodyParser.json());

// build an API that adds, edits, get, and deletes a person in the
// people.json file.

let employees = JSON.parse(fs.readFileSync('./employees.json', 'utf-8'));

//GET:
app.get('/employees', (req, res) => {
    // we want to return all people in the 
    // people.json file
    res.send(employees);
});

//GET certain person based on their ID
app.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    for(let i = 0; i < employees.length; i ++) {
        if (employees[i].id === id) {
            return res.send(employees[i]);
        }
    }
    
    res.status(404).send('Unable to find id');
});

app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filteredEmployees = employees.filter(employee => employee.id !== id);
    if (filteredEmployees.length === employees.length) {
        return res.status(404).send('Unable to find ID');
    }
    fs.writeFileSync('./employees.json', JSON.stringify(filteredEmployees));
    employees = filteredEmployees;
    res.send(filteredEmployees);
});

//adds a person
app.post('/employees', (req, res) => {
    // { name: "Maggie", age: 23, id: 9357 }
    // expecting: {name: "name", age: age, id: id}
    const {name, id, salary, department} = req.body;
    if (name && id && salary && department) {
        // success
        const newEmployee = {
            name,
            id,
            salary,
            department
        }
        employees.push(newEmployee);
        fs.writeFileSync('./employees.json', JSON.stringify(employees));
        res.send(newEmployee);
    } else {
        return res.status(422).send('Unable to add employee');
    }
});

app.put("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {name, salary, department} = req.body;
    for(let i = 0; i <= employees.length; i++){
      if(id === employees[i].id){
        const updatedEmployee = {
          name,
          id,
          salary,
          department
        };
        employees[i] = updatedEmployee;
        fs.writeFileSync("./employees.json", JSON.stringify(employees));
        res.send(employees);
        return
      } 
    }
    res.status(422).send("Unable to find employee")
  });

app.listen(3000);




