import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Paper, Button, Grid, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from 'react-google-login';

import Icon from "./Icon";
import Input from "./Input";
import useStyles from './Styles';
import { signIn, signUp } from '../../actions/auth';


function Auth() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if(isSignup){
            dispatch(signUp(formData, navigate));
        }
        else{
            dispatch(signIn(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : [e.target.value] });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
        setIsSignUp(!isSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token}});
            navigate('/');
        }catch(error){
            console.log(error)
        }
    };

    const googleFailure = (error) => {
        console.log("Google Sign in was unsuccessful");
        console.log(error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} sx={{backgroundColor: '#9c27b0'}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{ isSignup? 'Sign Up' : 'Sign In' }</Typography>
                <form onSubmit={handleSubmit} className={classes.form} sx={{margin:(3)}}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant="contained"  color="primary" sx={{marginTop: 3}} >
                        { isSignup ? 'Sign Up' : 'Sign In' } 
                    </Button>
                    <GoogleLogin 
                        clientId="178193740431-ku09ard3blqdtck2qg9obln67hqmgfq6.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button className={classes.googleButton} color='success' sx={{marginTop: 1}} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} color='secondary'>
                                {isSignup ? 'Already Have an account? Sign In' : 'Dont have an account? Sign Up' }
                            </Button>
                        </Grid>
                    </Grid>
                </form>  
            </Paper>
        </Container>
    )
}

export default Auth