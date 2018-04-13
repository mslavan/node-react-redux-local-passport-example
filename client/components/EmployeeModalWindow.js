import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';

const EmployeeModalWindow = ({
  isCreating,
  isOpen,
  values,
  onChangeText,
  onChangeDate,
  onRequestCreate,
  onRequestCancel,
  onRequestUpdate,
}) => (
  isOpen &&
  <Dialog
    autoScrollBodyContent
    title="Manage employee"
    actions={[
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onRequestCancel}
      />,
      isCreating 
      ?  <FlatButton
          label="Create"
          primary={true}
          onClick={onRequestCreate}/> 
      :  <FlatButton
          label="Update"
          primary={true}
          onClick={onRequestUpdate}/>
    ]}
    modal={true}
    open={isOpen}
  >
    <TextField
      fullWidth
      floatingLabelText='Full name'
      name='fullName'
      defaultValue={values.fullName}
      onChange={onChangeText}/>
    <DatePicker 
      fullWidth
      hintText='Born' 
      style={{ marginTop: 25 }}
      name='born'
      value ={values.born ? new Date(values.born) : ''}
      onChange={onChangeDate}/>
    <TextField
      fullWidth
      floatingLabelText='Position'
      name='position'
      defaultValue={values.position}
      onChange={onChangeText}/>
    <TextField
      fullWidth
      floatingLabelText='Salary (usd / month)'
      name='salary'
      defaultValue={values.salary}
      onChange={onChangeText}/>
  </Dialog>
);

EmployeeModalWindow.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onRequestCreate: PropTypes.func.isRequired,
  onRequestCancel: PropTypes.func.isRequired,
  onRequestUpdate: PropTypes.func.isRequired,
};

export default EmployeeModalWindow;
