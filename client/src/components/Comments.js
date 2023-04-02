import axios from 'axios';
import React, { Component } from 'react';
import AddComment from './AddComment';
import CommentItem from './CommentItem';
import './Comments.css';



class Comments extends Component{

    constructor(){
        super();
        this.state = {
          comments: [],
          userId:null,
          token: document.cookie//Read a Cookie with JavaScript

        }
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount(){
        this.getComments();
    }

    async getComments(){

            await axios.request({
                method:'get',
                //url:'http://localhost:7000/comments',
                url:'https://reandcomm.herokuapp.com/comments',
                headers: {"Authorization": `Bearer ${this.state.token}`}

            })

            .then(response => {
            this.setState({comments:response.data}); console.log("this is from comment get",response)
            })

            .catch((err) => console.log("tis is error from comments component",err));

    }

    render(){

        return(

                <div className='comments'>
                    <h1>Comments</h1>
                    <br />

                    {this.state.comments?
                    (this.state.comments.map((comment) => (<CommentItem key = {comment._id} comment={comment} goIt={this.getComments}/>))):null
                    }
                    <br />
                    <h1>Add A Comment</h1>
                    <br />

                    {
                    <AddComment doIt={this.getComments}/>
                    }

                </div>
        )
    }
}

export default Comments;
