import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CreateJob extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            salary: 0,
            maxapps: 0,
            maxpos: 0,
            deadline: '',
            skills: '',
            type: 'Full time',
            duration: 'Undefined',
            rating: 0,
            date: null
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeMaxapps = this.onChangeMaxapps.bind(this);
        this.onChangeMaxpos = this.onChangeMaxpos.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        //this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTitle(event) {
        this.setState({ title : event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary : event.target.value });
    }

    onChangeMaxapps(event) {
        this.setState({ maxapps : event.target.value });
    }

    onChangeMaxpos(event) {
        this.setState({ maxpos : event.target.value });
    }

    onChangeDeadline(event) {
        this.setState({ deadline : event.target.value });
    }

    onChangeSkills(event) {
        this.setState({ skills : event.target.value });
    }

    onChangeType(event) {
        this.setState({ type : event.target.value });
    }

    onChangeDuration(event) {
        this.setState({ duration : event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
        const newJob = {
            title: this.state.title,
            recruiter: localStorage.getItem("name"),
            salary: this.state.salary,
            maxapps: this.state.maxapps,
            maxpos: this.state.maxpos,
            deadline: this.state.deadline,
            skills: this.state.skills,
            type: this.state.type,
            duration: this.state.duration,
            //rating: this.state.rating,
            email: localStorage.getItem("email"),
            date: Date.now()
        }
        //localStorage.setItem("role", this.state.role);
        axios.post('http://localhost:4000/user/createjob', newJob)
             .then(res => {
                alert("Job created!");
                //add stuff here maybe?
                console.log(res.data)
             })
             .catch(err => {
                console.log(err)
             })
             ;

        this.setState({
            title: '',
            salary: '',
            maxapps: '',
            maxpos: '',
            deadline: '',
            skills: '',
            type: 'Full time',
            duration: 'Undefined',
            rating: '',
            date: null
        });
    }

    render() {
        return (
          <div className="container">
            <div>                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/recruiterprofile" className="navbar-brand">My Profile</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/createjob" className="nav-link">Create Job</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/activejobs" className="nav-link">Active Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Log Out</Link>
                            </li>                           
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum Applications: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.maxapps}
                               onChange={this.onChangeMaxapps}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum Positions: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.maxpos}
                               onChange={this.onChangeMaxpos}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline (dd/mm/yy hh:mm): </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangeDeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.skills}
                               onChange={this.onChangeSkills}
                               />  
                    </div>
                    <div className="form-group">
                        <label>
                          Type:
                          <select className="form-control" value={this.state.type} onChange={this.onChangeType}>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Work from Home">Work from Home</option>
                          </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                          Duration:
                          <select className="form-control" value={this.state.duration} onChange={this.onChangeDuration}>
                            <option value="Undefined">Undefined</option>
                            <option value="1 month">1 month</option>
                            <option value="2 months">2 months</option>
                            <option value="3 months">3 months</option>
                            <option value="4 months">4 months</option>
                            <option value="5 months">5 months</option>
                            <option value="6 months">6 months</option>
                          </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}