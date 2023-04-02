import axios from 'axios';
import React, { Component } from 'react';
import './Login.css';


class Login extends Component{

  constructor(){
    super();
    this.state = {

    }
  }

    NewUser(newUser){
        axios.request({
         withCredentials : true,
          method:'post',
          //in development:
          url:'http://localhost:7000/users/login',

          //in production:
          //url:'https://reandcomm.herokuapp.com/users/login',
          data: newUser,

        }).then(response =>


          {

            //get token from response
            const token=response.data.token;

            //set JWT token to local
            //localStorage.setItem("token", token);


            //put the token in cookie
            document.cookie= token;

            //redirect user to other page
            document.location.assign('http://localhost:3000/comments')
            //document.location.assign('https://reandcomm.herokuapp.com/comments')
            console.log(token)
          })


      .catch((err) => console.log(err))

    }

    onSubmit(e){
        const newUser = {
          email: this.refs.email.value,
          password: this.refs.password.value,

        }
        this.NewUser(newUser);
        e.preventDefault();
    }

  render(){
    return (

       <div className='login'>

       <h1>Login</h1>
       <form onSubmit={this.onSubmit.bind(this)}>


       <div className="input-field">
            <input type="text" name="email" ref="email" required/>
            <label htmlFor="email" className="black-text">Email</label>
        </div>

        <div className="input-field">
            <input type="password" name="password" ref="password" required/>
            <label htmlFor="password" className="black-text">Password</label>
        </div>


        <input type="submit" value="Submit" className="btn" />
       </form>


      </div>

    )
  }
}

export default Login;
