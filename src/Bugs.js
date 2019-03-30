import React, { Component } from 'react';
//import logo from './logo.svg';
import './Bugs.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';

const API_BASE = '/api';
//const API_BASE = "https://jrd-bugtracker.herokuapp.com/";

class BugForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.bug.title,
            description: props.bug.description,
            issue_type: props.bug.issue_type,
            priority: props.bug.priority,
            status: props.bug.status,
            id: props.bug.id,
            user_id: props.bug.user_id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this); 
        // this.addBug = this.addBug.bind(this);
        // this.updateBug = this.updateBug.bind(this);
    }
    renderButtons() {
        if (this.props.formMode === "new") {
            return (
                <button type="submit" className="btn btn-primary">Create</button>
            );
        } else {
            return (
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="bug-form">
                <h1> Bugs </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" id="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" id="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="issue_type">Issue Type</label>
                        <input type="text" className="form-control" name="issue_type" id="issue_type" placeholder="Issue Type" value={this.state.issue_type} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <input type="text" className="form-control" name="priority" id="priority" placeholder="Priority" value={this.state.priority} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text" className="form-control" name="status" id="status" placeholder="Status" value={this.state.status} onChange={this.handleInputChange} />
                    </div>
                    {this.renderButtons()}
                </form>
            </div>
        );
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        this.props.onSubmit({
            title: this.state.title,
            description: this.state.description,
            issue_type: this.state.issue_type,
            priority: this.state.priority,
            status: this.state.status,
            id: this.state.id,
            user_id: this.state.user_id
        });
        event.preventDefault();
    }
    handleCancel(event) {
        this.props.onCancel("new", { title: "", description: "", issue_type: "", priority: "", status: "" });
        event.preventDefault();
    }

    // addBug(newBug) {
    //     axios
    //         .post(`${API_BASE}/bugs.json`, newBug)
    //         .then(res => {
    //             res.data.key = res.data.id;
    //             this.setState({ bugs: [...this.state.bugs, res.data] });
    //         })
    //         .catch(err => console.log(err));
    // }
    // updateBug(bug) {
    //     axios
    //         .put(`${API_BASE}/bugs/${bug.id}.json`, bug)
    //         .then(res => {
    //             this.loadBugs();
    //         })
    //         .catch(err => console.log(err));
    // }
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
                user_id={bug.user_id}
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
                        {/* <th className="col-md-3">User</th> */}
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
            formMode: "new",
            bug: { title: "", description: "", issue_type: "", priority: "", status: "", id: "99999", user_id: "1" }
        };
        this.loadBugs = this.loadBugs.bind(this);
        this.removeBug = this.removeBug.bind(this);
        this.addBug = this.addBug.bind(this);
        this.updateBug = this.updateBug.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.formSubmitted = this.formSubmitted.bind(this);
    }
    render() {
        return (
            <div className="bugs">
                <BugForm
                    onSubmit={(bug) => this.formSubmitted(bug)}
                    onCancel={(mode, bug) => this.updateForm(mode, bug)}
                    formMode={this.state.formMode}
                    bug={this.state.bug}
                    key={this.state.bug.id}
                />
                <BugList bugs={this.state.bugs} />
            </div>
        );
    }

    loadBugs() {
        axios
            .get(`${API_BASE}bugs.json`)
            .then(res => {
                this.setState({ bugs: res.data });
                console.log(`Data loaded! = ${this.state.bugs}`)
            })
            .catch(err => console.log(err));
    }

    addBug(newBug) {
        axios
            .post(`${API_BASE}bugs.json`, newBug)
            .then(res => {
                res.data.key = res.data.id;
                this.setState({ bugs: [...this.state.bugs, res.data] });
            })
            .catch(err => console.log(err));
    }
    updateBug(bug) {
        axios
            .put(`${API_BASE}bugs/${bug.id}.json`, bug)
            .then(res => {
                this.loadBugs();
            })
            .catch(err => console.log(err));
    }
    removeBug(id) {
        let filteredArray = this.state.bugs.filter(item => item.id !== id)
        this.setState({ bugs: filteredArray });
        axios
            .delete(`${API_BASE}bugs/${id}.json`)
            .then(res => {
                console.log(`Record Deleted`);
                //this.clearForm();
            })
            .catch(err => console.log(err));
    }

    updateForm(mode, bugVals) {
        this.setState({
            bug: Object.assign({}, bugVals),
            formMode: mode,
        });
    }

    clearForm() {
        console.log("clear form");
        this.updateForm("new", { title: "", description: "", issue_type: "", priority: "", status: "", id: "99999", user_id: "1" });
    }

    formSubmitted(bug) {
        if (this.state.formMode === "new") {
            this.addBug(bug);
        } else {
            this.updateBug(bug);
        }
        this.clearForm();
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
            {/* <td className="col-md-3">{props.user.fname}</td> */}
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