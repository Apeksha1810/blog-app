import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../features/blogs/blogsSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField, Container, Grid, Paper } from '@mui/material';

const BlogEditor = ({ post = {}, onSave }) => {
  const [content, setContent] = useState(post.content || '');
  const [title, setTitle] = useState(post.title || '');
  const [image, setImage] = useState(post.image || null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (post.id) {
      dispatch(editPost({ id: post.id, content, title, image }));
    } else {
      dispatch(addPost({ id: Date.now(), title, content, image }));
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
            <TextField
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleImageChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"  // This will remove the underline
            />
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
