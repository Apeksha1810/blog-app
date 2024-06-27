import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../features/blogs/blogsSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField, Container, Grid, Paper, Typography } from '@mui/material';

const BlogEditor = ({ post = {}, onSave }) => {
  const [content, setContent] = useState(post.content || '');
  const [title, setTitle] = useState(post.title || '');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (post.id) {
      dispatch(editPost({ id: post.id, content, title }));
    } else {
      dispatch(addPost({ id: Date.now(), title, content }));
    }
    onSave(); 
  };

  const handleClose = () => {
    onSave(); 
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill value={content} onChange={setContent} />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleClose} sx={{ marginLeft: '8px' }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BlogEditor;
