import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

class Activejobs extends Component {
    
constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            edit: []
        }
        
    }

    componentDidMount() {
    	const ob = {
    		email: localStorage.getItem("email")
    	}
        axios.post('http://localhost:4000/user/activejobs', ob)
             .then(res => {
                 console.log("Got active jobs!");
                 this.setState({jobs: res.data});
                 var l = res.data.length;
                 var i;
                 for(i = 0; i < l; i++)
                 {
                    this.state.edit.push(false);
                 }
                 console.log(this.state.edit);
             })
             .catch(function(err) {
                 console.log(err);
             })
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
            	{this.state.jobs.map((job,ind) => (
                    <div>
                    {this.state.edit[ind] ?
                        <div>
                        <h5 style={{marginTop: 40}}>Title</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.title} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Date</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.date} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>No. of applicants</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.applicants.length} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Maximum applicants</h5>
                        <TextField fullWidth multiline defaultValue={job.maxapps} onChange={(event) =>
                            {
                                const array = this.state.jobs;
                                array[ind].maxapps = event.target.value;
                                this.setState({ jobs : array });
                            }}/>
                        <h5 style={{marginTop: 10}}>Maximum positions</h5>
                        <TextField fullWidth multiline defaultValue={job.maxpos} onChange={(event) =>
                            {
                                const array = this.state.jobs;
                                array[ind].maxpos = event.target.value;
                                this.setState({ jobs : array });
                            }}/>
                        <h5 style={{marginTop: 10}}>Deadline</h5>
                        <TextField fullWidth multiline defaultValue={job.deadline} onChange={(event) =>
                            {
                                const array = this.state.jobs;
                                array[ind].deadline = event.target.value;
                                this.setState({ jobs : array });
                            }}/>
                        <Button style={{marginTop: 10}} variant="contained" color="primary" onClick={() => {
                            localStorage.setItem("jobid", job._id);
                            this.props.history.push("/viewapplications");
                        }}>View Applications</Button>
                        <Button style={{marginTop: 10, marginLeft: 10}} variant="contained" color="primary" onClick={() => {
                            const arr = this.state.edit;
                            arr[ind] = false;
                            this.setState({ edit : arr});
                            const ob = {
                                id: job._id,
                                maxapps: job.maxapps,
                                maxpos: job.maxpos,
                                deadline: job.deadline
                            }
                            axios.post('http://localhost:4000/user/editjob', ob)
                             .then(response => {
                                 alert("Changes saved.");
                                 const ob = {
                                    email: localStorage.getItem("email")
                                }
                                axios.post('http://localhost:4000/user/activejobs', ob)
                                     .then(res => {
                                         console.log("Got active jobs!");
                                         this.setState({jobs: res.data});
                                         this.state.edit.pop();
                                         console.log(this.state.edit);
                                     })
                                     .catch(function(err) {
                                         console.log(err);
                                     })
                             })
                             .catch(function(err) {
                                 console.log(err);
                             })
                        }}>Save</Button>
                        <Button style={{marginTop: 10}} variant="contained" color="primary" disabled>Delete</Button>
                        </div>
                        :
                        <div>
                        <h5 style={{marginTop: 40}}>Title</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.title} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Date</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.date} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>No. of applicants</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.applicants.length} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Maximum applicants</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.maxapps} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Maximum positions</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.maxpos} InputProps={{readOnly: true,}}/>
                        <h5 style={{marginTop: 10}}>Deadline</h5>
                        <TextField fullWidth multiline id="standard-read-only-input" value={job.deadline} InputProps={{readOnly: true,}}/>
                        <Button style={{marginTop: 10}} variant="contained" color="primary" onClick={() => {
                            localStorage.setItem("jobid", job._id);
                            this.props.history.push("/viewapplications");
                        }}>View Applications</Button>
                        <Button style={{marginTop: 10, marginLeft: 10}} variant="contained" color="primary" onClick={() => {
                            const arr = this.state.edit;
                            arr[ind] = true;
                            this.setState({ edit : arr});
                        }}>Edit</Button>
                        <Button style={{marginTop: 10, marginLeft: 10}} variant="contained" color="primary" onClick={() => {
                            const ob = {
                                id : job._id
                            }
                            axios.post('http://localhost:4000/user/deletejob', ob)
                             .then(response => {
                                 alert("Job deleted.");
                                 const ob = {
                                    email: localStorage.getItem("email")
                                }
                                axios.post('http://localhost:4000/user/activejobs', ob)
                                     .then(res => {
                                         console.log("Got active jobs!");
                                         this.setState({jobs: res.data});
                                     })
                                     .catch(function(err) {
                                         console.log(err);
                                     })
                             })
                             .catch(function(err) {
                                 console.log(err);
                             })
                             
                        }}>Delete</Button>
                        </div>
                    }
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default Activejobs;