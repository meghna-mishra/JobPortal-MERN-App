import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Jobslist from './components/Users/Jobslist'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import Applicantprofile from './components/Users/Applicantprofile'
import Myapplications from './components/Users/Myapplications'
import CreateJob from './components/Users/CreateJob'
import Viewapplications from './components/Users/Viewapplications'
import Activejobs from './components/Users/Activejobs'
import Navbar from './components/templates/Navbar'
import Recruiterprofile from './components/Users/Recruiterprofile'
import Createrecruiter from './components/Common/Createrecruiter'
import Createapplicant from './components/Common/Createapplicant'

function App() {
  return (
    <Router>
      <div className="container">
        
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/applicantprofile" component={Applicantprofile}/>
        <Route path="/recruiterprofile" component={Recruiterprofile}/>
        <Route path="/createjob" component={CreateJob}/>
        <Route path="/createrecruiter" component={Createrecruiter}/>
        <Route path="/createapplicant" component={Createapplicant}/>
        <Route path="/jobslist" component={Jobslist}/>
        <Route path="/myapplications" component={Myapplications}/>
        <Route path="/activejobs" component={Activejobs}/>
        <Route path="/viewapplications" component={Viewapplications}/>
      </div>
    </Router>
  );
}

export default App;
