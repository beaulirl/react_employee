import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


function Cell(props){
	return (
		<div className="employee-table-cell">{props.item}</div>
		);
}

class EmployeeRow extends React.Component {
	render() {
		const cells = this.props.data;
		return (
			<div className="employee-row">
				<Cell item={cells.name}/>
				<Cell item={cells.job}/>
				<Cell item={cells.date}/>
				<Cell item={cells.att_date}/>
			</div>
			);
	}
}

class EmployeeHeader extends React.Component {
	render() {
		return (
			<div className="employee-header">
				<Cell item="ФИО"/>
				<Cell item="Должность"/>
				<Cell item="Дата начала работы"/>
				<Cell item="Дата аттестации"/>
			</div>
			);
	}
}


class EmployeeTable extends React.Component {
	render() {
		const employeeList = [];
		const rows = this.props.employeeData;
		rows.forEach((employee) => employeeList.push(<EmployeeRow key={employee.id} data={employee}/>));
		return (
			<div className="employee-table">
				<div className="employee-table-body">
					<EmployeeHeader employeeData={this.props.data}/>
					{employeeList}
				</div>
			</div>
		);
	}
}


class FilterComponent extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
	handleFilterTextChange(e){
		this.props.onFilterTextChange(e.target.value);
	}
	render() {
		return (
			<div className="filter">
				<input type="text" name="filter" placeholder="Search" value={this.props.filterText} onChange={this.handleFilterTextChange}/>
			</div> 
			);
	}
}


class FilterableEmployeeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}
	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	};
	render() {
		return (
			<div className="employee-list">
				<FilterComponent filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
				<EmployeeTable employeeData={this.props.data}/>
			</div>
			);
	}
}

const DATA = [{
	id: 1,
	name: 'Arcady Urbanovich',
	job: 'Senior Python',
	date: '03.12.2014',
	att_date: '01.03.2018',
	is_ready: true,
}, {
	id: 2,
	name: 'Roman Matushkin',
	job: 'Senior Python',
	date: '16.02.2014',
	att_date: '01.03.2018',
	is_ready: true
}, {
	id: 3,
	name: 'Olga Mindlina',
	job: 'Senior Python',
	date: '02.07.2015',
	att_date: '01.03.2018',
	is_ready: true
}]

ReactDOM.render(
  <FilterableEmployeeList data={DATA}/>,
  document.getElementById('root')
);