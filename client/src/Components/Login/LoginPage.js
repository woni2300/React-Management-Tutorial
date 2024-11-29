import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import VpnKey from '@material-ui/icons/VpnKey';
import { Navigate } from 'react-router-dom';


const styles = theme => ({
    dialog: {
        padding: theme.spacing(2),
    },
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userPassword: '',
            isSignUp: false,
            redirectToClient: false, // 리디렉션 상태

        };
    }

    handleOnChangeValue = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLogInSubmit = e =>{
        e.preventDefault();
        this.logIn()
            .then(res => {
                console.log(res);
                this.setState({
                    userId: '',
                    userPassword: '',
                    isSignUp: false,
                });
                localStorage.setItem('authToken','wejfklwjqeklrjwelkrjklsjie')
                this.setState({ redirectToClient: true });

            })
            .catch(err => {
                console.log(err);
                alert('로그인 실패');
            });
    }

    handleSignupSubmit = e => {
        e.preventDefault();
        this.signUp()
            .then(res => {
                console.log(res);
                this.setState({
                    userId: '',
                    userPassword: '',
                    isSignUp: false,
                });
                alert('가입이 성공적으로 완료되었습니다.');
            })
            .catch(err => {
                console.log(err);
                alert('가입 실패');
            });
    };


    logIn = ()=>{
        const url = '/api/users/login';
        const formData = new FormData();        
        console.log(this.state.userId);
        console.log(this.state.userPassword);
        
        formData.append('userid', this.state.userId);
        formData.append('password', this.state.userPassword);

        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    signUp = () => {
        const url = '/api/users/signup';
        const formData = new FormData();        
        formData.append('userid', this.state.userId);
        formData.append('password', this.state.userPassword);

        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    handleSignupClick = () => {
        this.setState({ isSignUp: true });
    };

    handleSignUpClose = () => {
        this.setState({
            userId: '',
            userPassword: '',
            isSignUp: false,
        });
    };

    render() {

        if (this.state.redirectToClient) {
            // 로그인 후 client 페이지로 리디렉션
            return <Navigate to="/customer" replace />;
        }


        return (
            <>
                <Dialog open={true} onClose={() => { }}>
                    <DialogTitle>로그인</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField
                                type="text"
                                name="userId"
                                label="ID"
                                onChange={this.handleOnChangeValue}
                                InputProps={{
                                    startAdornment: <Person />,
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                name="userPassword"
                                label="PASSWORD"
                                onChange={this.handleOnChangeValue}
                                InputProps={{
                                    startAdornment: <VpnKey />,
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary"  onClick={this.handleLogInSubmit}>
                            Log-In
                        </Button>
                        <Button variant="contained" color="primary">
                            Change-PW
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.handleSignupClick}>
                            Sign-up
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.isSignUp} onClose={this.handleSignUpClose}>
                    <DialogTitle>회원가입</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField
                                type="text"
                                name="userId"
                                label="ID"
                                onChange={this.handleOnChangeValue}
                                InputProps={{
                                    startAdornment: <Person />,
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                name="userPassword"
                                label="PASSWORD"
                                onChange={this.handleOnChangeValue}
                                InputProps={{
                                    startAdornment: <VpnKey />,
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSignupSubmit}>
                            Sign In
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.handleSignUpClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styles)(LoginPage);
