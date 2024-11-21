import React from 'react';
import post  from 'axios';


class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthDay: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e)=>{
        e.preventDefault();
        this.addCustomer().then((res)=>{
            console.log(res);
        })
    }

    addCustomer = ()=>{
        const url = '/api/customersAdd';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('userName',this.state.userName);
        formData.append('birthDay',this.state.birthDay);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = {
            header:{
                'content-type' : 'multipart/form-data'
            }
        }

        return post(url, formData, config);

    }


    handleFileChange = (e)=>{
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        })
    }


    handleValueChange = (e)=>{
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }


    render() {
        return (
            <>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>고객추가</h1>
                    프로필이미지 : <input type='file' name='file' file={this.state.file} value={this.state.fileName}  onChange={this.handleFileChange}></input>
                    이름 : <input type='text' name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
                    생년월일 : <input type='text' name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange}></input>
                    성별 : <input type='text' name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
                    직업 : <input type='text' name="job" value={this.state.job} onChange={this.handleValueChange}></input>
                    <button type='submit'>추가하기</button>
                </form>


            </>
        )
    }



}

export default CustomerAdd;