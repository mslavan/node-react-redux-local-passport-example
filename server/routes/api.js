var express = require('express');
var router = express.Router();

//////////////////////
// MONGO queries
//////////////////////

const q = require('./api-queries');

router.get('/employees', q.getEmployees);
router.post('/employees', q.addEmployee);
router.put('/employees/:id', q.updateEmployee);
router.delete('/employees/:id', q.deleteEmployee);

module.exports = router;