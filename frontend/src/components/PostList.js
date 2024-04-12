;import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/postlist/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.image && (
              <div>
                <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />
              </div>
            )}
            {post.video && (
              <div>
                <video controls style={{ maxWidth: '100%' }}>
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList