import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class Viewapplications extends Component {
    
constructor(props) {
        super(props);

        this.state = {
            applications: []
        }

    }

    componentDidMount() {
        const ob = {
            jobid: localStorage.getItem("jobid")
        }
        axios.post('http://localhost:4000/user/viewapplications', ob)
             .then(res => {
                 var array = res.data.filter(function(app) {
                    return ( (app.stage != "Rejected") && (app.stage != "Accepted") );
                 });
                 console.log(array);
                 this.setState({applications: array});
             })
             .catch(function(error) {
                 console.log(error);
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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell style={{fontSize: 20}}>Name</TableCell>
                                <TableCell style={{fontSize: 20}}>Skills</TableCell>
                                <TableCell style={{fontSize: 20}}>Education</TableCell>
                                <TableCell style={{fontSize: 20}}>Date of Application</TableCell>
                                <TableCell style={{fontSize: 20}}>SOP</TableCell>
                                <TableCell style={{fontSize: 20}}>Stage</TableCell>
                                <TableCell style={{fontSize: 20}}>     </TableCell>
                                <TableCell style={{fontSize: 20}}>     </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.applications.map((application,ind) => (
                            <TableRow key={ind}>
                                <TableCell>{application.name}</TableCell>
                                <TableCell>{application.skills.toString()}</TableCell>
                                <TableCell>
                                (Institute: {application.education[0].institute}, Start Year: {application.education[0].start_year}, End Year: {application.education[0].end_year})
                                 (Institute: {application.education[1].institute}, Start Year: {application.education[1].start_year}, End Year: {application.education[1].end_year})
                                </TableCell>
                                <TableCell>{application.date}</TableCell>
                                <TableCell>{application.sop}</TableCell>
                                <TableCell>{application.stage}</TableCell>
                                <TableCell><Button variant="contained" color="secondary" onClick={() => {
                                 const ob = {
                                        id : application._id
                                    }
                                    axios.post('http://localhost:4000/user/reject', ob)
                                     .then(response => {
                                         alert("Applicant rejected.");

                                         window.location.reload();
                                    })
                                    .catch(function(err) {
                                     console.log(err);
                                    })   
                                }} >Reject</Button></TableCell>
                                <TableCell>
                                {application.stage == "Applied" ? 
                                <Button variant="contained" color="primary" onClick={() => {
                                 const ob = {
                                        id : application._id
                                    }
                                    axios.post('http://localhost:4000/user/shortlist', ob)
                                     .then(response => {
                                         alert("Applicant shortlisted.");

                                         window.location.reload();
                                    })
                                    .catch(function(err) {
                                     console.log(err);
                                    })   
                                }} >Shortlist</Button>
                                :
                                <Button variant="contained" color="primary" onClick={() => {
                                 const ob = {
                                        id : application._id
                                    }
                                    axios.post('http://localhost:4000/user/accept', ob)
                                     .then(response => {
                                         alert("Applicant accepted.");

                                         window.location.reload();
                                    })
                                    .catch(function(err) {
                                     console.log(err);
                                    })   
                                }} >Accept</Button>
                                }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            </div>
            )
    }
}

export default Viewapplications;