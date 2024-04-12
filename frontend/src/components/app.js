import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { render } from "react-dom"; 
import Home from "./Home";
import { PostForm } from './PostForm';

import Post from './Post';
import PostList from "./PostList";
import AnalyticsDashboard from "./AnalyticsDashboard";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/analytics" element={<AnalyticsDashboard/>} />
            <Route path="/posts/create" element={<PostForm />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/postslist" element={<PostList />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);