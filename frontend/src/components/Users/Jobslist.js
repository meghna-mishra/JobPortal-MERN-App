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
import Fuse from 'fuse.js';

class Jobslist extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            ogjobs: [],
            email: localStorage.getItem("email"),
            apply: false,
            submit: false,
            sop: '',
            index: '',
            sort: '',
            filter: '',
            selectedType: '',
            selectedDur: '',
            minSal: -1,
            maxSal: -1,
            search: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onApply = this.onApply.bind(this);
        this.onSop = this.onSop.bind(this);
        this.sortSalAsc = this.sortSalAsc.bind(this);
        this.sortSalDes = this.sortSalDes.bind(this);
        this.sortDurAsc = this.sortDurAsc.bind(this);
        this.sortDurDes = this.sortDurDes.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/jobslist')
             .then(response => {
                 this.setState({jobs: response.data});
                 this.setState({ogjobs : response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onApply(e) {
        e.preventDefault();
        console.log("Entered onApply");
        this.setState({ apply: true });
    }

    onSop(e) {
        e.preventDefault();
        this.setState({ sop: e.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ submit: true });
        this.setState({ apply: false });
        const Ap = {
            sop: this.state.sop,
            email: localStorage.getItem("email"),
            remail: this.state.jobs[this.state.index].email,
            title: this.state.jobs[this.state.index].title,
            recruiter: this.state.jobs[this.state.index].recruiter,
            salary: this.state.jobs[this.state.index].salary,
            jobid: this.state.jobs[this.state.index]._id
        }
        var i;
        axios.post('http://localhost:4000/user/createapplication', Ap)
             .then(res => {
                console.log(res.data);
                if(res.data == "Maximum applications reached.")
                {
                    alert("Maximum applications reached!");
                    this.setState({
                        apply: false,
                        submit: false,
                        sop: ''
                    });
                }
                else if(res.data == "Application submitted.")
                {
                    alert("Application submitted!");
                    this.setState({
                        apply: false,
                        submit: false,
                        sop: ''
                    });
                    window.location.reload();
                }
                /*this.props.history.push('/recruiterprofile');
                console.log(res.data)*/
             })
             .catch(err => {
                console.log(err);
                alert("Error submitting application.");
             })
             ;

    }

    onChangeSort(event){
        event.preventDefault();
        this.setState({ sort: event.target.value });
        if(event.target.value == "SalAsc")
        {
            this.sortSalAsc();
        }
        else if(event.target.value == "SalDes")
        {
            this.sortSalDes();
        }
        else if(event.target.value == "DurAsc")
        {
            this.sortDurAsc();
        }
        else if(event.target.value == "DurDes")
        {
            this.sortDurDes();
        }
    }

    onChangeFilter(event){
        event.preventDefault();
        this.setState({ filter: event.target.value });
        if(event.target.value == "Salary")
        {
            console.log("Entered salary filtering");
            var arr = this.state.ogjobs;
            const minSal = this.state.minSal;
            const maxSal = this.state.maxSal;
            console.log(minSal);
            console.log(maxSal);
            if((maxSal >= 0) && (minSal >= 0))
            {
                var array = arr.filter(function(job) {
                    return ((job.salary <= maxSal) && (job.salary >= minSal));
                });
                console.log(array);
            }
            else if(maxSal >= 0)
            {
                var array = arr.filter(function(job) {
                    return (job.salary <= maxSal);
                });
                console.log(array);   
            }
            else if(minSal >= 0)
            {
                var array = arr.filter(function(job) {
                    return (job.salary >= minSal);
                });
                console.log(array);
            }
            else
            {
                var array = arr;
            }
            this.setState({
                jobs : array
            });
        }
        else if(event.target.value == "Type")
        {
            console.log("Entered type filtering");
            var arr = this.state.ogjobs;
            const type = this.state.selectedType;
            console.log(type);
            if(type)
            {
                var array = arr.filter(function(job) {
                    return (job.type == type);
                });
                console.log(array);
            }
            else
            {
                var array = arr;
            }
            this.setState({
                jobs : array
            });   
        }
        else if(event.target.value == "Duration")
        {
            console.log("Entered duration filter");
            var arr = this.state.ogjobs;
            const dur = this.state.selectedDur;
            console.log(dur);
            if(dur)
            {
                var array = arr.filter(function(job) {
                    return (job.duration < dur);
                });
                console.log(array);
            }
            else
            {
                var array = arr;
            }
            this.setState({
                jobs : array
            });
        }
    }


    sortSalAsc(){
        console.log("Entered sortSalAsc");
        var array = this.state.jobs;
        array.sort(function(a, b) {
            return (new Number(a.salary) - new Number(b.salary))
          });
        console.log(array);
        this.setState({
            jobs : array
        })
    }

    sortSalDes(){
        console.log("Entered sortSalDes");
        var array = this.state.jobs;
        array.sort(function(a, b) {
            return (new Number(b.salary) - new Number(a.salary))
          });
        console.log(array);
        this.setState({
            jobs : array
        })
    }

    sortDurAsc(){
        console.log("Entered sortDurAsc");
        var array = this.state.jobs;
        array.sort(function(a, b) {
            return (new Number(a.duration.charAt(0)) - new Number(b.duration.charAt(0)))
          });
        console.log(array);
        this.setState({
            jobs : array
        })
    }

    sortDurDes(){
        console.log("Entered sortDurDes");
        var array = this.state.jobs;
        array.sort(function(a, b) {
            return (new Number(b.duration.charAt(0)) - new Number(a.duration.charAt(0)))
          });
        console.log(array);
        this.setState({
            jobs : array
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
            <div>
                <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                          value={this.state.sort}
                          onChange={this.onChangeSort}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="SalAsc">Salary: Low to High</MenuItem>
                        <MenuItem key="1" value="SalDes">Salary: High to Low</MenuItem>
                        <MenuItem key="2" value="DurAsc">Duration: Low to High</MenuItem>
                        <MenuItem key="3" value="DurDes">Duration: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Filter by</InputLabel>
                        <Select
                          value={this.state.filter}
                          onChange={this.onChangeFilter}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="Salary">Salary</MenuItem>
                        <MenuItem key="1" value="Type">Type</MenuItem>
                        <MenuItem key="2" value="Duration">Duration</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={this.state.selectedType}
                          onChange={(event) => {
                            const filter = this.state.filter;
                            this.setState({ selectedType : event.target.value });
                            if(filter == "Type")
                            {
                                console.log("Entered type filtering");
                                var arr = this.state.ogjobs;
                                const type = event.target.value;
                                console.log(type);
                                if(type)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.type == type);
                                    });
                                    console.log(array);
                                }
                                else
                                {
                                    var array = arr;
                                }
                                this.setState({
                                    jobs : array
                                });   
                            }
                            }}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="Full time">Full time</MenuItem>
                        <MenuItem key="1" value="Part time">Part time</MenuItem>
                        <MenuItem key="2" value="Work from Home">Work from Home</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Duration</InputLabel>
                        <Select
                          value={this.state.selectedDur}
                          onChange={(event) => {
                            const filter = this.state.filter;
                            this.setState({ selectedDur : event.target.value });
                            if(filter == "Duration")
                            {
                                console.log("Entered duration filter");
                                var arr = this.state.ogjobs;
                                const dur = event.target.value;
                                console.log(dur);
                                if(dur)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.duration < dur);
                                    });
                                    console.log(array);
                                }
                                else
                                {
                                    var array = arr;
                                }
                                this.setState({
                                    jobs : array
                                });
                            }
                            }}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="1">Less than 1 month</MenuItem>
                        <MenuItem key="1" value="2">Less than 2 months</MenuItem>
                        <MenuItem key="2" value="3">Less than 3 months</MenuItem>
                        <MenuItem key="3" value="4">Less than 4 months</MenuItem>
                        <MenuItem key="4" value="5">Less than 5 months</MenuItem>
                        <MenuItem key="5" value="6">Less than 6 months</MenuItem>
                        <MenuItem key="6" value="7">Less than 7 months</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                       <Input style={{marginTop: 16}} placeholder="Enter min salary" value={this.minSal} onChange={ (event) => {
                            const filter= this.state.filter;
                            const val = Number(event.target.value);
                            this.setState({ minSal : val });
                            if(filter == "Salary")
                            {
                                console.log("Entered salary filtering");
                                var arr = this.state.ogjobs;
                                const minSal = val;
                                const maxSal = this.state.maxSal;
                                console.log(minSal);
                                console.log(maxSal);
                                if((maxSal >= 0) && (minSal >= 0))
                                {
                                    var array = arr.filter(function(job) {
                                        return ((job.salary <= maxSal) && (job.salary >= minSal));
                                    });
                                    console.log(array);
                                }
                                else if(maxSal >= 0)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.salary <= maxSal);
                                    });
                                    console.log(array);   
                                }
                                else if(minSal >= 0)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.salary >= minSal);
                                    });
                                    console.log(array);
                                }
                                else
                                {
                                    var array = arr;
                                }
                                this.setState({
                                    jobs : array
                                });
                            }
                        }
                       }/> 
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                       <Input style={{marginTop: 16}} placeholder="Enter max salary" value={this.maxSal} onChange={ (event) => {
                            const filter= this.state.filter;
                            const val = Number(event.target.value);
                            this.setState({ maxSal : val });
                            if(filter == "Salary")
                            {
                                console.log("Entered salary filtering");
                                var arr = this.state.ogjobs;
                                const minSal = this.state.minSal;
                                const maxSal = val;
                                console.log(minSal);
                                console.log(maxSal);
                                if((maxSal >= 0) && (minSal >= 0))
                                {
                                    var array = arr.filter(function(job) {
                                        return ((job.salary <= maxSal) && (job.salary >= minSal));
                                    });
                                    console.log(array);
                                }
                                else if(maxSal >= 0)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.salary <= maxSal);
                                    });
                                    console.log(array);   
                                }
                                else if(minSal >= 0)
                                {
                                    var array = arr.filter(function(job) {
                                        return (job.salary >= minSal);
                                    });
                                    console.log(array);
                                }
                                else
                                {
                                    var array = arr;
                                }
                                this.setState({
                                    jobs : array
                                });
                            }
                         }
                       }/> 
                    </FormControl>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                       <Input style={{marginTop: 16}} placeholder="Search by title" value={this.search} onChange={(event) => {
                        var arr = this.state.ogjobs;
                        var text = event.target.value;
                        if (text) {
                          const fuse = new Fuse(arr, {
                            keys: [
                                'title'
                            ]
                          });
                            var filteredListings = fuse.search(text)
                            arr = filteredListings.map((listing) => listing.item)
                        }
                        this.setState({
                         jobs : arr,
                         search : text
                        })
                       }}/>
                    </FormControl>
            </div>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell style={{fontSize: 20}}>Title</TableCell>
                                <TableCell style={{fontSize: 20}}>Recruiter</TableCell>
                                <TableCell style={{fontSize: 20}}>Salary</TableCell>
                                <TableCell style={{fontSize: 20}}>Deadline</TableCell>
                                <TableCell style={{fontSize: 20}}>Required Skills</TableCell>
                                <TableCell style={{fontSize: 20}}>Type</TableCell>
                                <TableCell style={{fontSize: 20}}>Duration</TableCell>
                                <TableCell style={{fontSize: 20}}>    </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.jobs.map((job,ind) => (
                            <TableRow key={ind}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.recruiter} ({job.email})</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>{job.deadline}</TableCell>
                                <TableCell>{job.skills}</TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>{job.duration}</TableCell>
                                <TableCell>
                                { job.applicants.indexOf(this.state.email) == -1 ? 
                                    <Button color="primary" onClick={  () => {
                                        this.setState({ apply: true });
                                        this.setState({ index: ind });
                                    } }>Apply</Button>
                                    : 
                                    <Button disabled>Applied</Button> 
                                }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={this.state.apply}>
                    <DialogTitle>Enter Statement of Purpose</DialogTitle>
                    <DialogContent>
                        <TextField multiline fullWidth value={this.sop} onChange={this.onSop}/>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
            )
    }
}

export default Jobslist;