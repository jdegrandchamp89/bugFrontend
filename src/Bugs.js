import React, { Component } from 'react';
//import logo from './logo.svg';
import './Bugs.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const BugForm = (props) => {
    return (
        <div className="bug-form">
            Our Bug Form Goes Here.
        </div>
    );
}

const BugList = (props) => {
    const bugItems = props.bugs.map((bug) => {
        return (
            <BugListItem
                title={bug.title}
                description={bug.description}
                issue_type={bug.issue_type}
                priority={bug.priority}
                status={bug.status}
                id={bug.id}
                key={bug.id}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
            />
        )
    });
    return (
        <div className="bug-list">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-md-3">Title</th>
                        <th className="col-md-3">Description</th>
                        <th className="col-md-3">Issue Type</th>
                        <th className="col-md-3">Priority</th>
                        <th className="col-md-3">Status</th>
                        <th className="col-md-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bugItems}
                </tbody>
            </table>
        </div>
    );
}

class Bugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: [],
        };
        this.loadBugs = this.loadBugs.bind(this);
    }
    render() {
        return (
            <div className="bugs">
                <BugForm />
                <BugList bugs={this.state.bugs} />
            </div>
        );
    }

    loadBugs() {
        this.setState({
            bugs: [
                { title: "help", description: "I need help with this rails business", issue_type: "issue", priority: "medium", status: "open" },
                { title: "broken stuff", description: "there is some stuff broken", issue_type: "feature", priority: "low", status: "monitor" }
            ]
        }
        )
    }
    componentDidMount() {
        console.log('Bugs mounted!')
        this.loadBugs();
    }
}

const BugListItem = (props) => {
    return (
        <tr>
            <td className="col-md-3">{props.title}</td>
            <td className="col-md-3">{props.description}</td>
            <td className="col-md-3">{props.issue_type}</td>
            <td className="col-md-3">{props.priority}</td>
            <td className="col-md-3">{props.status}</td>
            <td className="col-md-3 btn-toolbar">
                <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit", props)}>
                    <i className="glyphicon glyphicon-pencil"></i> Edit</button>
                <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
                    <i className="glyphicon glyphicon-remove"></i> Delete</button>
            </td>
        </tr>
    );
}

export default Bugs;