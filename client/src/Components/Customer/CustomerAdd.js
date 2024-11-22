import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    dialog: {
        maxWidth: '300px'
    },
    imagePreview: {
        width: '250px', // 크기 250px로 설정
        minWidth:'250px',
        minHeight:'250px',
        marginTop: '10px',
        border: '1px solid black'
        
    }
});


class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            filename: '',
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }
    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            filename: '',
            open: false
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((res) => {
            console.log(res);
            this.setState({
                file: null,
                userName: '',
                birthday: '',
                gender: '',
                job: '',
                filename: '',
                open:false
            })
            this.props.stateRefresh();

        }).catch((err) => {
            console.log(err);
        })


    }

    addCustomer = () => {

        const url = '/api/customerAdd';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        return axios({
            method: 'post', // 명시적으로 POST 요청
            url: url,
            data: formData,
            headers: config.headers,
        });

    }


    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            filename: e.target.value
        })
    }


    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    render() {
        const { classes } = this.props;

         // 선택된 파일에 대한 이미지 미리보기 URL
         const previewImage = this.state.file ? URL.createObjectURL(this.state.file) : 'https://dummyimage.com/250/FFFFFF/00000';
         
        return (
            <>                <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent className={classes.dialog}   >
                        <input
                            className={classes.hidden}
                            type='file'
                            name='file'
                            accept='image/*'
                            id='raised-button-file'
                            value={this.state.filename}
                            onChange={this.handleFileChange}></input>
                        <label htmlFor="raised-button-file">
                            <Button
                                variant="contained"
                                color='primary'
                                component="span"
                                name="file" >
                                {this.state.filename === "" ? "프로필 이미지 선택" : (this.state.filename.length >= 20 ? this.state.filename.substring(0, 19) + "..." : this.state.filename)}
                            </Button>
                        </label>
                        <br></br>

                        {/* 이미지 미리보기 */}
                        <img
                            src={previewImage}
                            alt="Preview"
                            className={classes.imagePreview} />
                        <br />

                        <TextField
                            label='이름'
                            type='text'
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleValueChange} />


                        <TextField
                            label='생년월일'
                            type='date'
                            name="birthday"
                            value={this.state.birthday}
                            onChange={this.handleValueChange}
                            defaultValue={'2024-11-22'}
                            InputLabelProps={{ shrink: true, }} />


                        <TextField
                            label='성별'
                            type='text'
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleValueChange}>
                            
                        </TextField>

                        <TextField
                            label='직업'
                            type='text'
                            name="job"
                            value={this.state.job}
                            onChange={this.handleValueChange} />

                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가하기</Button>
                        <Button variant='outlined' color='primary' onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>


            </>
        )
    }



}

export default withStyles(styles)(CustomerAdd);