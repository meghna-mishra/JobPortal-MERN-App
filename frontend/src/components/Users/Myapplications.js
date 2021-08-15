import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Myapplications extends Component {
    
constructor(props) {
        super(props);

        this.state = {
            applications: []
        }

    }

    componentDidMount() {
        const ob = {
            email: localStorage.getItem("email")
        }
        axios.post('http://localhost:4000/user/myapplications', ob)
             .then(res => {
                console.log(res.data);
                 this.setState({applications: res.data});
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
                    <Link to="/applicantprofile" className="navbar-brand">My Profile</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/jobslist" className="nav-link">Jobs List</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/myapplications" className="nav-link">My Applications</Link>
                            </li>      
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Log Out</Link>
                            </li>               
                        </ul>
                    </div>
                </nav>
            </div>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell style={{fontSize: 20}}>Title</TableCell>
                                <TableCell style={{fontSize: 20}}>Recruiter</TableCell>
                                <TableCell style={{fontSize: 20}}>Salary</TableCell>
                                <TableCell style={{fontSize: 20}}>Date</TableCell>
                                <TableCell style={{fontSize: 20}}>Stage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.applications.map((application,ind) => (
                            <TableRow key={ind}>
                                <TableCell>{application.title}</TableCell>
                                <TableCell>{application.recruiter}</TableCell>
                                <TableCell>{application.salary}</TableCell>
                                <TableCell>{application.date}</TableCell>
                                <TableCell>{application.stage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            )
    }
}

export default Myapplications;