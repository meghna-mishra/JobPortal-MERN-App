import React, {Component} from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (

            <Grid
				  container
				  direction="column"
				  justify="center"
				  alignItems="center"
				  spacing={0}
				  style={{ minHeight: '100vh' }}
				>
                <Grid item xs={6}>
                	<Typography variant="h1" align="center">LinkedOut</Typography>
                <Grid
				  container
				  direction="row"
				  justify="space-between"
				  alignItems="center"
				>
				<Grid item>
		          <Button variant="contained" color="primary" style={{marginTop: 10}} size="large" href="http://localhost:3000/login">Log In</Button>  
		        </Grid>
		        <Grid item>
		          <Button variant="contained" color="primary" style={{marginTop: 10}} size="large" href="http://localhost:3000/register">Register</Button>
		        </Grid>
		        </Grid>
		        
		        </Grid>   
		        </Grid> 

        )
    }
}