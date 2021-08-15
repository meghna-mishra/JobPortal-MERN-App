import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
//import RecNavbar from './components/templates/RecNavbar'
//import Recruiterprofile from './components/Users/Recruiterprofile'

class Applicantprofile extends Component {
    
constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            education: [ { institute: '', start_year: '', end_year: '' }, { institute: '', start_year: '', end_year: '' } ],
            skills: [],
            disabled: true,
            resume: null
        }

        this.onEdit = this.onEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeInst = this.changeInst.bind(this);
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
        this.changeInstt = this.changeInstt.bind(this);
        this.changeStartt = this.changeStartt.bind(this);
        this.changeEndd = this.changeEndd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    componentDidMount() {
        const ob = {
            email: localStorage.getItem("email")
        }
        axios.post('http://localhost:4000/user/applicantprofile', ob)
             .then(res => {
                 this.setState({name : res.data.name});
                 this.setState({education : res.data.education});
                 this.setState({ skills : res.data.skills});
                 this.setState({email : res.data.email});
                 localStorage.setItem("name", res.data.name);
             })
             .catch(function(err) {
                 console.log(err);
             })
    }

    

    /*onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }*/

    onEdit(e) {
        e.preventDefault();
        console.log("Entered onEdit function");
        this.setState({disabled: false});
    }

    changeInst(event) {
        var temp = this.state.education;
        temp[0].institute = event.target.value;
        this.setState({ education : temp })
    }

    changeInstt(event) {
        var temp = this.state.education;
        temp[1].institute = event.target.value;
        this.setState({ education : temp })
    }

    changeStart(event) {
        var temp = this.state.education;
        temp[0].start_year = event.target.value;
        this.setState({ education : temp })
    }

    changeStartt(event) {
        var temp = this.state.education;
        temp[1].start_year = event.target.value;
        this.setState({ education : temp })
    }

    changeEnd(event) {
        var temp = this.state.education;
        temp[0].end_year = event.target.value;
        this.setState({ education : temp })
    }

    changeEndd(event) {
        var temp = this.state.education;
        temp[1].end_year = event.target.value;
        this.setState({ education : temp })
    }

    handleChange(event) {
      this.setState({skills : event.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Entered onSubmit function");
        this.setState({disabled: true});
        const app = {
            email: localStorage.getItem("email"),
            skills: this.state.skills,
            education: this.state.education
        }
        axios.post('http://localhost:4000/user/editapplicant', app)
             .then(res => {
                 console.log(res);
                 alert("Updated!");
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
                <h1 style={{marginTop: 10}}>{this.state.name}</h1>
                <h3 style={{marginTop: 10}}>Email</h3>
                <TextField fullWidth multiline id="standard-read-only-input" value={this.state.email} InputProps={{readOnly: true,}}/>
                { this.state.education[0].institute ? 
                <div>
                <h3 style={{marginTop: 10}}>Education</h3>
                <h5 style={{marginTop: 10}}>Institute</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[0].institute} InputProps={{readOnly: true,}}/> : <TextField required fullWidth id="standard-required" defaultValue={this.state.education[0].institute} onChange={this.changeInst}/>}
                <h5 style={{marginTop: 10}}>Start Year</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[0].start_year} InputProps={{readOnly: true,}}/> : <TextField required fullWidth id="standard-required" defaultValue={this.state.education[0].start_year} onChange={this.changeStart}/>}
                <h5 style={{marginTop: 10}}>End Year</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[0].end_year} InputProps={{readOnly: true,}}/> : <TextField fullWidth id="standard-required" defaultValue={this.state.education[0].end_year} onChange={this.changeEnd}/>}
                </div> : <div></div>}
                { this.state.education[1].institute ? 
                <div>
                <h5 style={{marginTop: 30}}>Institute</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[1].institute} InputProps={{readOnly: true,}}/> : <TextField required fullWidth id="standard-required" defaultValue={this.state.education[1].institute} onChange={this.changeInstt}/>}
                <h5 style={{marginTop: 10}}>Start Year</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[1].start_year} InputProps={{readOnly: true,}}/> : <TextField required fullWidth id="standard-required" defaultValue={this.state.education[1].start_year} onChange={this.changeStartt}/>}
                <h5 style={{marginTop: 10}}>End Year</h5>
                {this.state.disabled ? <TextField fullWidth id="standard-read-only-input" value={this.state.education[1].end_year} InputProps={{readOnly: true,}}/> : <TextField fullWidth id="standard-required" defaultValue={this.state.education[1].end_year} onChange={this.changeEndd}/>}
                </div>
                : <div></div>}
                
                
                
                <h3 style={{marginTop: 10}}>Skills</h3>
                {this.state.disabled ? 
                    <FormControl className="form-group" disabled style={{minWidth: 120}}>
                        
                        <Select
                          multiple
                          value={this.state.skills}
                          InputProps={{readOnly: true,}}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="Python">Python</MenuItem>
                        <MenuItem key="1" value="C">C</MenuItem>
                        <MenuItem key="2" value="C++">C++</MenuItem>
                        <MenuItem key="3" value="Java">Java</MenuItem>
                        <MenuItem key="4" value="JavaScript">JavaScript</MenuItem>
                        <MenuItem key="5" value="HTML">HTML</MenuItem>
                        <MenuItem key="6" value="CSS">CSS</MenuItem>
                        </Select>
                        </FormControl>
                        :
                        <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Skills</InputLabel>
                        <Select
                          multiple
                          defaultValue={this.state.skills}
                          onChange={this.handleChange}
                          input={<Input />}
                        >
                        <MenuItem key="0" value="Python">Python</MenuItem>
                        <MenuItem key="1" value="C">C</MenuItem>
                        <MenuItem key="2" value="C++">C++</MenuItem>
                        <MenuItem key="3" value="Java">Java</MenuItem>
                        <MenuItem key="4" value="JavaScript">JavaScript</MenuItem>
                        <MenuItem key="5" value="HTML">HTML</MenuItem>
                        <MenuItem key="6" value="CSS">CSS</MenuItem>
                        </Select>
                    </FormControl>
                }
            </div>
            <div>
            {this.state.disabled ? <Button variant="contained" href="#" onClick={this.onEdit} color="primary" style={{marginTop: 10}}>Edit</Button> : <Button color="primary" variant="contained" href="#" onClick={this.onSubmit} style={{marginTop: 10}}>Submit</Button>}
            </div>
            </div>
        )
    }
}

export default Applicantprofile;