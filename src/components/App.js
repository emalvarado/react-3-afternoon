import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts/`)
      .then((response) => {
        // console.log(response)
        this.setState({
          posts: response.data
        })
      })

  }


  //below the {text} would really be text:this.state.text but because the key is the same as the value, you can just write {text}
  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
      .then((response) => {
        console.log(response)
        this.setState({
          posts: response.data
        })
      })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then((response)=>{
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, {text})
    .then((response)=>{
      this.setState({
        posts: response.data
      })
    })
  }

  // handleChange(prop,val){
  //   this.setState({
  //     [prop]: val
  //   })
  // }

search(val){

  axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${val}`)
  .then((response)=>{
    this.setState({
      posts: response.data
    })
  })
}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.search}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {posts.map(post => (
            <Post key={post.id}
              text={post.text}
              date={post.date} 
              id={post.id}
              updatePostFn={ this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}

        </section>
      </div>
    );
  }
}

export default App;
