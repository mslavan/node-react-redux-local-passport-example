import React from 'react';
import {Col, Row, Container, ScreenClassRender, Visible, Hidden} from 'react-grid-system'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const WorkBoard = ({
  selectedRow,
  onAddClicked,
  onChangeClicked,
  onDeleteClicked,
}) => (
  <div>
    <h1 className='center'>Manage employees</h1>
    <Row>
      <Col xl={3}>
        <RaisedButton 
          primary
          className='margin-small'
          label='Add employee' 
          onClick={onAddClicked}/>
      </Col>
      <Col xs={4} offset={{ xs: 5}}>
        { selectedRow && 
            <div>
              <RaisedButton
                className='margin-small'
                label='Change'
                onClick={onChangeClicked}/>
              <RaisedButton 
                className='margin-small'
                label='Delete' 
                onClick={onDeleteClicked}/>
            </div> }
        </Col>    
    </Row>
  </div>
);

WorkBoard.propTypes = {
  onAddClicked: PropTypes.func.isRequired,
  onChangeClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
};

export default WorkBoard;
