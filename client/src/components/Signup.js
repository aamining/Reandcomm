import axios from 'axios';
import React, { Component } from 'react';
import './Signup.css';


class Signup extends Component{

    NewUser(newUser){
        axios.request({
          method:'post',
          // in dedevelopment:
          //url:'http://localhost:7000/signup',
          // in production:
          url:'https://reandcomm.herokuapp.com/signup',
          data: newUser,

        })//.then((response) => window.location.assign('https://commentsforali.herokuapp.com/login'))
        //in development:
        .then((response) => window.location.assign('https://reandcomm.herokuapp.com/login'))

        .catch(err => console.log(err));
      }

    onSubmit(e){
        const newUser = {
          username:this.refs.username.value,
          email: this.refs.email.value,
          password: this.refs.password.value,


        }
        this.NewUser(newUser);
        e.preventDefault();
      }

  render(){
    return (

       <div className='signup'>

       <h1>Signup</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
       <div className="input-field">
            <input type="text" name="username" ref="username" required/>
            <label htmlFor="username" className="black-text">User name</label>
        </div>

       <div className="input-field">
            <input type="text" name="email" ref="email" required/>
            <label htmlFor="email" className="black-text">email (unique)</label>
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

export default Signup;
