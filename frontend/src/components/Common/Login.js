import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

            email: '',
            pwd: ''

        }

        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
    
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }    


    onSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
        const oldUser = {

            email: this.state.email,
            pwd: this.state.pwd

        }
        axios.post('http://localhost:4000/user/login', oldUser)
             .then(res => {
                alert("Logged in succesfully.");
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("role", res.data.role);
                if(res.data.role == "applicant")
                {
                  this.props.history.push('/applicantprofile');
                }
                else if(res.data.role == "recruiter")
                {
                  this.props.history.push('/recruiterprofile');
                }
                console.log(res.data)
             })
             .catch(err => {
                alert("Error logging in.");
                console.log(err)
             })
             ;

        this.setState({

            email: '',
            pwd: '',

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
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.pwd}
                               onChange={this.onChangePwd}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}