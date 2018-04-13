
// db models
const Employees = require('../../models/employees.js');


// functions


function getEmployees(req, res, next) {
  const { page } = req.query;

  Employees
    .paginate({}, { page, limit: 10 })
    .then( data =>
      res.status(200).send(data)
    )
    .catch(err => {
      res.status(500).send({ err })
    });
}

function addEmployee(req, res, next) {
  const EmployeeData = { 
    fullName: req.body.fullName,
    born: req.body.born,
    position: req.body.position, 
    salary: req.body.salary,  
  };

  const employee = new Employees(EmployeeData);

  employee.save()
    .then( data =>
      res.status(201).send({ status: 1 })
    )
    .catch(err => {
      res.status(500).send({ err })
    });
}

function updateEmployee(req, res, next) {
  const { fullName, born, position, salary } = req.body;
  
  Employees.findById(req.params.id, function (err, employee) {
    if (err) return console.log(err);

    employee.fullName = fullName;
    employee.born     = born;
    employee.position = position;
    employee.salary   = salary;

    employee.save(function (err, updatedTank) {
      if (err) return console.log(err);
      res.status(201).send({ status: 1 })
    });
  });
}

function deleteEmployee(req, res, next) {
  
  Employees.deleteOne({ _id: req.params.id })
    .then( data =>
      res.status(200).send({ status: 1 })
    )
    .catch(err => {
      res.status(500).send({ err })
    });
}

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
}