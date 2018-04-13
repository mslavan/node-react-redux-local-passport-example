import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';


function renderDate(date) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
  let day = date.getDate();

  return `${year}-${month}-${day}`
}


const TableEmployees = ({
  employees,
  paginate,
  selectedRow,
  onRowSelection,
  onPreviousPage,
  onNextPage,
}) => (
  <Table
    onRowSelection={onRowSelection}
  >
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Full name</TableHeaderColumn>
        <TableHeaderColumn>Born</TableHeaderColumn>
        <TableHeaderColumn>Position</TableHeaderColumn>
        <TableHeaderColumn>Salary(usd/month)</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody 
      deselectOnClickaway={false}
    >
      {employees.map( (employee, index) =>
        <TableRow selected={employee._id === selectedRow} key={employee._id}>
          <TableRowColumn>{employee.fullName}</TableRowColumn>
          <TableRowColumn>{renderDate(employee.born)}</TableRowColumn>
          <TableRowColumn>{employee.position}</TableRowColumn>
          <TableRowColumn>{employee.salary}</TableRowColumn>
        </TableRow>
      )}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableHeaderColumn>
          <span className='margin-small'>Page: {paginate.page} of {paginate.pages}</span>
          <span className='margin-small'>Limit: {paginate.limit}</span>
          <span className='margin-small'>Total employees: {paginate.total}</span>
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FlatButton 
            disabled={paginate.page === 1}
            label='Previous page'
            onClick={onPreviousPage}/>
          <FlatButton 
            disabled={paginate.page === paginate.pages}
            label='Next page'
            onClick={onNextPage}/>
        </TableHeaderColumn>
      </TableRow>
    </TableFooter>
  </Table>
);

TableEmployees.propTypes = {
  employees: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
  onRowSelection: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};

export default TableEmployees;
