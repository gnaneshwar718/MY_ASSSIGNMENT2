import React from 'react';
import { Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';

const Post = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={post.image ? post.image : 'https://via.placeholder.com/150'}
        alt="Post Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;