import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseURL: "https://practiceapi.devmountain.com/api"
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  componentDidMount() {
    let promise = axios.get(`${this.state.baseURL}/posts`)
    promise.then( res => {
      this.setState({
        posts: res.data
      });
    });
  }

  updatePost(id, text) {
    let promise = axios.put(`${this.state.baseURL}/posts/?id=${id}`,{text})
    promise.then( res => {
      this.setState({
        posts: res.data
      });
    });
  }

  deletePost(id) {
    let promise = axios.delete(`${this.state.baseURL}/posts/?id=${id}`)
    promise.then(res=>{
      this.setState({
        posts: res.data
      });
    });
  }

  createPost(text) {
    let promise = axios.post(`${this.state.baseURL}/posts`, {text})
    promise.then(res=>{
      this.setState({
        posts:res.data
      });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
              createPostFn={this.createPost}/>

          {
            posts.map( post=> (
            <Post key={ post.id}
              id={post.id} 
              text={post.text} 
              date={post.date} 
              updatePostFn={this.updatePost} 
              deletePostFn={this.deletePost}/>
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
