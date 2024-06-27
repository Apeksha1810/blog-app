import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features/blogs/blogsSlice';
import { Button, Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

const BlogPost = ({ post, onEdit }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleEdit = () => {
    onEdit(post);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ maxWidth: 345, margin: '20px', border: '1px solid #ccc' }}>
      {post.image && (
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt="Post Image"
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expanded ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '') }} />
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {post.content.length > 100 && (
          <Button size="small" onClick={toggleExpand}>
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        )}
        <Button size="small" onClick={handleEdit}>Edit</Button>
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default BlogPost;
