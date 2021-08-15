import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Recruiterprofile extends Component {
    
constructor(props) {
        super(props);

        this.state = {
            data: {},
            contact: '',
            bio: '',
            disabled: true
        }

        this.onEdit = this.onEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        //this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    componentDidMount() {
    	const ob = {
    		email: localStorage.getItem("email")
    	}
        axios.post('http://localhost:4000/user/recruiterprofile', ob)
             .then(res => {
                 console.log(res.data);
                 this.setState({data: res.data});
                 this.setState({contact: res.data.contact});
                 this.setState({bio: res.data.bio});
                 localStorage.setItem("name", res.data.name);
             })
             .catch(function(err) {
                 console.log(err);
             })
    }

    onChangeContact(event) {
        this.setState({ contact: event.target.value });
    }

    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }

    /*onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }*/

    onEdit(e) {
        e.preventDefault();
        console.log("Entered onEdit function");
        this.setState({disabled: false});
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Entered onSubmit function");
        this.setState({disabled: true});
        const rec = {
            email: localStorage.getItem("email"),
            contact: this.state.contact,
            bio: this.state.bio
        }
        console.log(rec);
        axios.post('http://localhost:4000/user/editrecruiter', rec)
             .then(res => {
                 console.log(res.data);
                 this.setState({data: res.data});
                 this.setState({contact: res.data.contact});
                 this.setState({bio: res.data.bio});
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
            	<h1 style={{marginTop: 10}}>{this.state.data.name}</h1>
                <h3 style={{marginTop: 10}}>Email</h3>
                <TextField fullWidth multiline id="standard-read-only-input" value={this.state.data.email} InputProps={{readOnly: true,}}/>
                <h3 style={{marginTop: 10}}>Contact</h3>
                {this.state.disabled ? <TextField fullWidth multiline id="standard-read-only-input" value={this.state.contact} InputProps={{readOnly: true,}}/> : <TextField fullWidth multiline defaultValue={this.state.contact} onChange={this.onChangeContact}/>}
                <h3 style={{marginTop: 10}}>Bio</h3>
                {this.state.disabled ? <TextField fullWidth multiline id="standard-read-only-input" value={this.state.bio} InputProps={{readOnly: true,}}/> : <TextField fullWidth multiline defaultValue={this.state.bio} onChange={this.onChangeBio}/>}
                {this.state.disabled ? <Button variant="contained" href="#" onClick={this.onEdit} color="primary" style={{marginTop: 10}}>Edit</Button> : <Button color="primary" variant="contained" href="#" onClick={this.onSubmit} style={{marginTop: 10}}>Submit</Button>}
            </div>
            </div>
        )
    }
}

export default Recruiterprofile;