import React, {Component} from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

export default class Createapplicant extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            skills: [],
            education: [ { institute: '', start_year: '', end_year: '' }, { institute: '', start_year: '', end_year: '' } ],
            disabled: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeInst = this.changeInst.bind(this);
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
        this.changeInstt = this.changeInstt.bind(this);
        this.changeStartt = this.changeStartt.bind(this);
        this.changeEndd = this.changeEndd.bind(this);
        this.changeAble = this.changeAble.bind(this);

        }
    

    /*onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }*/

    changeAble(e) {
        e.preventDefault();
        this.setState({disabled: false});
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
        const newApp = {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            skills: this.state.skills,
            education: this.state.education
        }
        //localStorage.setItem("role", this.state.role);
        axios.post('http://localhost:4000/user/createapplicant', newApp)
             .then(res => {
                console.log(res);
                alert("Applicant created succesfully!");
                this.props.history.push('/applicantprofile');
             })
             .catch(err => {
                console.log(err)
             })
             ;

        this.setState({
            name: '',
            email: '',
            skills: [],
            education: [ { institute: '', start_year: '', end_year: '' }, { institute: '', start_year: '', end_year: '' } ]
        });
    }

    handleChange(event) {
      /*var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }*/
      this.setState({skills : event.target.value})
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


    render() {
        return (

            <div>
            {
                this.state.disabled ?
                <div style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
                }}>
                <form onSubmit={this.onSubmit}>
                    
                    <div id="one" className="form-group" style={{marginTop: 50}}>
                    <label>Institute:</label>
                    <input type="text" value={this.state.education[0].institute} onChange={this.changeInst} />
                    <label>Start Year:</label>
                    <input type="text" value={this.state.education[0].start_year} onChange={this.changeStart} />
                    <label>End Year:</label>
                    <input type="text" value={this.state.education[0].end_year} onChange={this.changeEnd} />
                    </div>
                    <Button variant="contained" href="#" onClick={this.changeAble} color="primary" style={{marginTop: 10}}>Add another institute</Button>
                    <div style={{marginTop: 50}}>
                        <label>Select skills:</label>
                    </div>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Skills</InputLabel>
                        <Select
                          multiple
                          value={this.state.skills}
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
                    <div className="form-group" style={{marginTop: 30}}>
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
                :
                <div style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <form onSubmit={this.onSubmit}>
                    
                    <div id="one" className="form-group" style={{marginTop: 50}}>
                    <label>Institute:</label>
                    <input type="text" value={this.state.education[0].institute} onChange={this.changeInst} />
                    <label>Start Year:</label>
                    <input type="text" value={this.state.education[0].start_year} onChange={this.changeStart} />
                    <label>End Year:</label>
                    <input type="text" value={this.state.education[0].end_year} onChange={this.changeEnd} />
                    </div>
                    <div id="two" className="form-group" style={{marginTop: 50}}>
                    <label>Institute:</label>
                    <input type="text" value={this.state.education[1].institute} onChange={this.changeInstt} />
                    <label>Start Year:</label>
                    <input type="text" value={this.state.education[1].start_year} onChange={this.changeStartt} />
                    <label>End Year:</label>
                    <input type="text" value={this.state.education[1].end_year} onChange={this.changeEndd} />
                    </div>
                    <div style={{marginTop: 50}}>
                        <label>Select skills:</label>
                    </div>
                    <FormControl className="form-group" style={{minWidth: 120}}>
                        <InputLabel>Skills</InputLabel>
                        <Select
                          multiple
                          value={this.state.skills}
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
                    <div className="form-group" style={{marginTop: 30}}>
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

            }
            </div>
        )
    }
}