import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/PageActions'
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'

import Auth from '../modules/Auth'
 
import HeaderBar from '../components/HeaderBar'
import WorkBoard from '../components/WorkBoard'
import TableEmployees from '../components/TableEmployees'
import EmployeeModalWindow from '../components/EmployeeModalWindow'

const resetModal = {
	openModal: false,
	creating: false,
};

const resetEmployee = {
	currEmployeeId: null,
	currEmployee: {}
};

class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      employeesPage: 1,
      employees: [],
      paginate: {},
      openModal: false,
      creating: false,
      selectedRow: null,
      currEmployeeId: null,
      currEmployee: {}
    };

    this.axiosGetEmployes   = this.axiosGetEmployes.bind(this);
    this.onLogout 		 	    = this.onLogout.bind(this);
    this.onAddClicked 	 	  = this.onAddClicked.bind(this);
    this.onChangeClicked 	  = this.onChangeClicked.bind(this);
    this.onDeleteClicked 	  = this.onDeleteClicked.bind(this);
    this.onRowSelection 	  = this.onRowSelection.bind(this);
    this.onRequestCancel 	  = this.onRequestCancel.bind(this);
    this.onRequestCreate 	  = this.onRequestCreate.bind(this);
    this.onRequestUpdate 	  = this.onRequestUpdate.bind(this);
    this.onChangeModalText  = this.onChangeModalText.bind(this);
    this.onChangeModalDate  = this.onChangeModalDate.bind(this);
    this.onPreviousPage 	  = this.onPreviousPage.bind(this);
    this.onNextPage 		    = this.onNextPage.bind(this);
  }

  componentWillMount() {
    const { history, profile } = this.props;
    if (_.isEmpty(profile.user)) {
        history.replace({ pathname: '/login' });
    }
  }

  componentDidMount() {
    this.axiosGetEmployes()
  }

  axiosGetEmployes() {
  	const page = this.state.employeesPage;

  	axios.get('/api/employees', {
  	  headers: { 
  	  	'Authorization': `user ${Auth.getToken()}` 
  	  },
  	  params:  { 
  	  	page,
  	  }
  	})
    .then( res => res.data )
    .then( json => {
      const paginate = {
      	limit: parseInt(json.limit),
      	page:  parseInt(json.page),
      	pages: parseInt(json.pages),
      	total: parseInt(json.total),
      }

  	  this.setState({ employees: json.docs, paginate })
    })
  }

  onLogout() {
  	this.props.pageActions.logoutUser();
  	this.props.history.push('/login')
  }

  onAddClicked() {
  	this.setState(Object.assign({ openModal: true, creating: true }, resetEmployee))
  }
  
  onChangeClicked() {
  	this.setState({ openModal: true, creating: false })
  }
  
  onDeleteClicked() {
  	const {  currEmployeeId } = this.state;
  	
  	axios.delete('/api/employees/' + currEmployeeId, {
  		headers: { 'Authorization': `user ${Auth.getToken()}` }
  	})
    .then( () => {
      this.setState(resetModal)
      this.axiosGetEmployes() 
    })
  }

  onRowSelection(rowNubmers) {

  	let { employees } = this.state;

  	if(rowNubmers[0] === undefined) {
  		this.setState(resetEmployee)
  		return;
  	}

  	const index = rowNubmers[0] > -1 ? rowNubmers[0] : null;

	let currEmployee = employees[index];
	this.setState({ 
		currEmployee, 
		currEmployeeId: currEmployee._id 
	})
  }

  onRequestCancel() {
  	this.setState(resetModal)
  }

  onRequestCreate() {
  	const { currEmployee } = this.state;
  	
  	axios.post('/api/employees', currEmployee, {
  		headers: { 'Authorization': `user ${Auth.getToken()}` }
  	})
    .then( () => {
      this.setState(resetModal)
      this.axiosGetEmployes() 
    })
  }

  onRequestUpdate() {
  	const { currEmployee, currEmployeeId } = this.state;
  	
  	axios.put('/api/employees/' + currEmployeeId, currEmployee, {
  		headers: { 'Authorization': `user ${Auth.getToken()}` }
  	})
    .then( () => {
      this.setState(resetModal)
      this.axiosGetEmployes() 
    })
  	
  }

  onChangeModalText(event) {
    const field = event.target.name;
    const { currEmployee } = this.state;
    currEmployee[field] = event.target.value;

    this.setState({
      currEmployee
    });
  }

  onChangeModalDate(empty, value) {
  	const { currEmployee } = this.state;
  	currEmployee['born'] = value.toString();

  	this.setState({
  		currEmployee
  	});
  }

  onPreviousPage() {
  	this.setState({ employeesPage: this.state.employeesPage -1 }, this.axiosGetEmployes)
  }

  onNextPage() {
  	this.setState({ employeesPage: this.state.employeesPage +1 }, this.axiosGetEmployes)
  }

  render() {
  	const { 
  		employees, 
  		paginate,
  		openModal,
  		creating,
  		currEmployeeId,
  		currEmployee,
  	} = this.state;

  	const { 
  		user 
  	} = this.props.profile;

  	const isLogged = _.isEmpty(user) ? false : true;

    return (
      <div>
        <HeaderBar 
          user={user} 
          isLogged={isLogged}
          onLogout={this.onLogout}/>
        <div className='margin-small padding-middle'>
          <WorkBoard 
            selectedRow={currEmployeeId}
            onAddClicked={this.onAddClicked}
            onChangeClicked={this.onChangeClicked}
            onDeleteClicked={this.onDeleteClicked} />
          <TableEmployees 
            employees={employees} 
            paginate={paginate}
            selectedRow={currEmployeeId}
            onRowSelection={this.onRowSelection}
            onPreviousPage={this.onPreviousPage}
            onNextPage={this.onNextPage}/>            
          <EmployeeModalWindow 
            isOpen={openModal}
            isCreating={creating}
            values={currEmployee}
            onChangeText={this.onChangeModalText}
            onChangeDate={this.onChangeModalDate}
            onRequestCancel={this.onRequestCancel}
            onRequestCreate={this.onRequestCreate}
            onRequestUpdate={this.onRequestUpdate}/>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
	return {
		pageActions: bindActionCreators(pageActions, dispatch),
	}
}

const mapStateToProps = ({ profile }) => ({
  profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);