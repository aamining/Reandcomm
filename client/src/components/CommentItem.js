import axios from 'axios';
import React, { Component } from 'react';


class CommentItem extends Component{

  constructor(){
    super();
    this.state = {


      userId:null,
      token: document.cookie//Read a Cookie with JavaScript

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
    .catch((err) => console.log("error from whoAmI",err))
  }

  deleteItem(id){
    axios.request({

      headers: {"Authorization": `Bearer ${this.state.token}`},
        method:'delete',
        //url:'http://localhost:7000/comments/'+id
        url:'https://reandcomm.herokuapp.com/comments/'+id


      })

      .then(response => {
        console.log("this is an ok from delete", response)

      })

      .catch(err => {console.log("this error is from delete:",err)})

      .then(response=>{this.props.goIt()})
      // this is from comment component.
      // the third line always executed in axios structure.

  }



  render(){
    return(

      this.state.userId===this.props.comment.user_id?

      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel yellow lighten-4 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="logo192.png" alt="" class="circle responsive-img"/>
            </div>
            <div class="col s10">
              <span class="black-text">

              You said: {this.props.comment.comm}
              <button className="fa-solid fa-trash-arrow-up" onClick={()=>this.deleteItem(this.props.comment._id)}></button>

              </span>
            </div>
          </div>
        </div>
      </div>

      :

      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="logo192.png" alt="" class="circle responsive-img"/>
            </div>
            <div class="col s10">
              <span class="black-text">

              <p>{this.props.comment.name} as a {this.props.comment.title} says {this.props.comment.comm}</p>



              </span>
            </div>
          </div>
        </div>
      </div>


    )
  }

}
export default CommentItem;




// const CommentItem= (props) => (

//   <div className="box">
//     <div className="commentItem">
//       <p> {props.comment.name} as a {props.comment.title} says {props.comment.comm} </p>
//     </div>
//   </div>

//   );
//   export default CommentItem;
