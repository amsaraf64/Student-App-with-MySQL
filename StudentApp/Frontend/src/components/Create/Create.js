import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleChangeStudentID = this.handleChangeStudentID.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleStudentCreate = this.handleStudentCreate.bind(this);

        this.state = {
            studentID : null,
            name : null,
            department : null,
            studentCreated : false
        }
    }
    
    handleChangeStudentID = (e) => {
        this.setState({
            studentID : e.target.value
        })
    }

    handleChangeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    handleChangeDepartment = (e) => {
        this.setState({
            department : e.target.value
        })
    }

    handleStudentCreate = (e) => {
        var data = {
            studentID : this.state.studentID,
            name : this.state.name,
            department : this.state.department
        }
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        studentCreated : true
                    })
                }else{
                    this.setState({
                        studentCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(!cookie.load('cookie')){
            redirect = <Redirect to= "/login"/>
        }
        else if(this.state.studentCreated){
            redirect = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangeStudentID} type="text" class="form-control" name="StudentID" placeholder="Student ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeName} type="text" class="form-control" name="Name" placeholder="Student Name"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeDepartment} type="text" class="form-control" name="Department" placeholder="Student Department"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleStudentCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;