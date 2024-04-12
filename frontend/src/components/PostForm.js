import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';

export const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [scheduledPublishDate, setScheduledPublishDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }
    formData.append('scheduled_publish_date', scheduledPublishDate.toISOString());

    try {
      const response = await axios.post('/api/postscreate/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Post created:', response.data);

      setTitle('');
      setDescription('');
      setImage(null);
      setVideo(null);
      setError(null); // Clear any previous errors
      setSuccess('Post created successfully.');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again later.');
    }
  };

  return (
    <Box component="div">
      <Typography variant="h2">Create New Post</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <form onSubmit={handleSubmit}>
        <Box component="div" sx={{ marginBottom: '16px' }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Box>
        <Box component="div" sx={{ marginBottom: '16px' }}>
          <TextField label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Box>
        <Box component="div" sx={{ marginBottom: '16px' }}>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
        </Box>
        <Box component="div" sx={{ marginBottom: '16px' }}>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/mp4" />
        </Box>
        <Box component="div" sx={{ marginBottom: '16px' }}>
          <TextField label="Scheduled Publish Date" type="datetime-local" value={scheduledPublishDate.toISOString().slice(0, -1)} onChange={(e) => setScheduledPublishDate(new Date(e.target.value + ':00'))} required />
        </Box>
        <Button type="submit" variant="contained" color="primary">Create Post</Button>
      </form>
    </Box>
  );
};
