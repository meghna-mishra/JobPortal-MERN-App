import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            pwd: '',
            role: 'applicant',
            date: null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }    

    onChangeRole(event) {
        this.setState({ role: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            pwd: this.state.pwd,
            role: this.state.role,
            date: Date.now()
        }
        //localStorage.setItem("role", this.state.role);
        axios.post('http://localhost:4000/user/register', newUser)
             .then(res => {
                alert("Registered succesfully!");
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("email", res.data.email);
                if(res.data.role == 'applicant')
                    this.props.history.push('/createapplicant');
                if(res.data.role == 'recruiter')
                    this.props.history.push('/createrecruiter');
                console.log(res.data)
             })
             .catch(err => {
                console.log(err)
             })
             ;

        this.setState({
            name: '',
            email: '',
            pwd: '',
            role: 'applicant',
            date: null
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
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
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
                        <label>
                          Select role:
                          <select className="form-control" value={this.state.role} onChange={this.onChangeRole}>
                            <option value="applicant">Applicant</option>
                            <option value="recruiter">Recruiter</option>
                          </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
