import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            students : [],
            redirectVar: null
        };
        this.deleteStudent = this.deleteStudent.bind(this); 
    }  
    //get the students data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                     console.log("Data: " + JSON.stringify(response.data));
                this.setState({
                    students : this.state.students.concat(response.data) 
                });
            });
    }

    deleteStudent = (id,e) => {
        //prevent page from refresh
       /*  e.preventDefault();   */
        console.log(id);
        //make a post request with the user data
        var url = 'http://localhost:3001/delete/'
        var requesturl = url + id;
        console.log(requesturl);
        
        axios.delete(requesturl)
            .then(response => {
                console.log("Status Code : ",response.status);  
                console.log("Data: " + JSON.stringify(response.data));
               /*  this.setState({
                    students : response.data
                })        */   
                window.location = "/home";
            });         
    }

    render(){
        //iterate over students to create a table row
        let details = this.state.students.map(student => {
            return(
                <tr>
                    <td>{student.studentID}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                    <td><button onClick={this.deleteStudent.bind(this, student.studentID)} value={student.studentID}>Delete</button></td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Students</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;