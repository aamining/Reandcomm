import axios from 'axios';
import React, { Component } from 'react';


class AddComment extends Component{

    constructor(){
        super();
        this.state = {
          token: document.cookie,//Read a Cookie with JavaScript
          userId:null
        }
    }

    componentDidMount(){
      this.getUser();
    }


    getUser(){
      axios.request({
        method:'get',
        //url:'http://localhost:7000/whoAmI',
        url:'https://reandcomm.herokuapp.com/whoAmI',
        headers: {"Authorization": `Bearer ${this.state.token}`}


      }).then(response =>{
        this.setState({userId:response.data})

      })
      .catch((err) => console.log("err from whoAmI",err))
    }


  addComment(newComment){
    axios.request({

    headers: {"Authorization": `Bearer ${this.state.token}`},
      method:'post',
      //url:'http://localhost:7000/comments',
      url:'https://reandcomm.herokuapp.com/comments',

      data: newComment,

    }).then(response => {
      console.log("this is from addcomment page:", response)

    })
    .catch(err => console.log(err))

    .then(response=>{this.props.doIt()});
    //call a function(getComments) from another component(comments)@ this point
    // the third line always executed in axios structure.

  }


  onSubmit(e){
    const newComment = {
      name: this.refs.name.value,
      title: this.refs.title.value,
      comm: this.refs.comm.value,
      user_id:this.state.userId

    }
    this.addComment(newComment);
    e.preventDefault();
    }


  render(){
    return (
     <div>
        <br />

       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">

            <input type="text" name="name" ref="name" required/>
            <label htmlFor="name" className="black-text">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="title" ref="title" required/>
            <label htmlFor="title" className="black-text">Title</label>
          </div>
          <div className="input-field">

            <input type="text" name="comm" ref="comm" required/>
            <label htmlFor="comm" className="black-text">Comment</label>

          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default AddComment;
