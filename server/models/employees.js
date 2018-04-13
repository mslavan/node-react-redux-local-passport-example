const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// define the Employees model schema
const EmployeesShema = new mongoose.Schema({
  fullName: String,
  born: Date,
  position: String,
  salary: Number,
});

EmployeesShema.plugin(mongoosePaginate);

module.exports = mongoose.model('Employees', EmployeesShema);
