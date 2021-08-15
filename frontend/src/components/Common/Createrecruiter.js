
import React, {Component} from 'react';
import axios from 'axios';

export default class Createrecruiter extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            contact: '',
            bio: '',
        }

        //this.onChangeUsername = this.onChangeUsername.bind(this);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /*onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }*/

    onChangeContact(event) {
        this.setState({ contact: event.target.value });
    }    

    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
        const newRec = {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            contact: this.state.contact,
            bio: this.state.bio,
        }
        //localStorage.setItem("role", this.state.role);
        axios.post('http://localhost:4000/user/createrecruiter', newRec)
             .then(res => {
                alert("Recruiter created succesfully!");
                this.props.history.push('/recruiterprofile');
                console.log(res.data)
             })
             .catch(err => {
                console.log(err)
             })
             ;

        this.setState({
            name: '',
            email: '',
            contact: '',
            bio: '',
        });
    }

    render() {
        return (
            <div style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Contact number: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contact}
                               onChange={this.onChangeContact}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text" maxLength="250"
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangeBio}
                               />  
                    </div>
                    <div className="form-group" style={{marginTop: 10}}>
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}