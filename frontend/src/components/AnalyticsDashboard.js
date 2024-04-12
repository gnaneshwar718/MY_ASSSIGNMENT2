import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Button, Box } from '@mui/material';
import { FavoriteBorderOutlined, ShareOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import axios from 'axios';

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentTextMap, setCommentTextMap] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/postlist/');
            const initialData = response.data.map(post => ({ ...post, comments: [] }));
            setAnalyticsData(initialData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            setError('Failed to fetch analytics data. Please try again later.');
            setIsLoading(false);
        }
    };

    const updateLike = async (postId, updatedLikes) => {
        try {
            const response = await axios.post(`/api/posts/${postId}/like/`, { likes: updatedLikes });
            return response.data;
        } catch (error) {
            console.error('Error updating like count:', error);
            // Handle error
        }
    };

    const updateShare = async (postId, updatedShares) => {
        try {
            const response = await axios.post(`/api/posts/${postId}/share/`, { shares: updatedShares });
            return response.data;
        } catch (error) {
            console.error('Error updating share count:', error);
            // Handle error
        }
    };

    const updateComment = async (postId, commentText) => {
        try {
            const response = await axios.post(`/api/posts/${postId}/comment/`, { commentText });
            return response.data;
        } catch (error) {
            console.error('Error updating comment:', error);
            // Handle error
        }
    };

    const handleLike = async (postId) => {
        try {
            const postToUpdateIndex = analyticsData.findIndex(post => post.id === postId);

            if (postToUpdateIndex === -1) {
                console.error('Post not found:', postId);
                return;
            }

            const updatedLikes = analyticsData[postToUpdateIndex].likes + 1;

            const updatedData = [...analyticsData];
            updatedData[postToUpdateIndex] = { ...updatedData[postToUpdateIndex], likes: updatedLikes };

            setAnalyticsData(updatedData);

            await updateLike(postId, updatedLikes); // Update the likes on the server
        } catch (error) {
            console.error('Error liking post:', error);
            // Handle error
        }
    };

    const handleShare = async (postId) => {
        try {
            const postToUpdateIndex = analyticsData.findIndex(post => post.id === postId);

            if (postToUpdateIndex === -1) {
                console.error('Post not found:', postId);
                return;
            }

            const updatedShares = analyticsData[postToUpdateIndex].shares + 1;

            const updatedData = [...analyticsData];
            updatedData[postToUpdateIndex] = { ...updatedData[postToUpdateIndex], shares: updatedShares };

            setAnalyticsData(updatedData);

            await updateShare(postId, updatedShares); // Update the shares on the server
        } catch (error) {
            console.error('Error sharing post:', error);
            // Handle error
        }
    };

    const handleCommentChange = (postId, value) => {
        setCommentTextMap(prevState => ({
            ...prevState,
            [postId]: value
        }));
    };

    const handleComment = async (postId) => {
        try {
            const commentText = commentTextMap[postId];

            if (!commentText) {
                console.error('Comment text cannot be empty');
                return;
            }

            // Update UI optimistically
            const postToUpdateIndex = analyticsData.findIndex(post => post.id === postId);
            const updatedData = [...analyticsData];
            updatedData[postToUpdateIndex] = { ...updatedData[postToUpdateIndex], comments: [...updatedData[postToUpdateIndex].comments, commentText] };

            setAnalyticsData(updatedData);

            // Update comment on server
            await updateComment(postId, commentText);

            // Clear comment text
            setCommentTextMap(prevState => ({
                ...prevState,
                [postId]: ''
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error
        }
    };

    return (
        <Box p={4}>
            <Typography variant="h2" gutterBottom>Analytics Dashboard</Typography>
            {isLoading && <CircularProgress />}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Post ID</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Shares</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {analyticsData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.likes}</TableCell>
                            <TableCell>{item.shares}</TableCell>
                            <TableCell>{item.comments.map((comment, commentIndex) => (
                                <Typography key={commentIndex}>{comment}</Typography>
                            ))}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleLike(item.id)}>
                                    <FavoriteBorderOutlined />
                                </IconButton>
                                <IconButton onClick={() => handleShare(item.id)}>
                                    <ShareOutlined />
                                </IconButton>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={commentTextMap[item.id] || ''}
                                        onChange={(e) => handleCommentChange(item.id, e.target.value)}
                                        placeholder="Add a comment"
                                    />
                                    <Button variant="contained" color="primary" onClick={() => handleComment(item.id)}>Add Comment</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default AnalyticsDashboard;
