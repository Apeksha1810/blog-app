import React from 'react';
import { useSelector } from 'react-redux';
import BlogPost from './BlogPost';
import { Typography } from '@mui/material';

const BlogList = ({ onEdit }) => {
  const posts = useSelector((state) => state.blogs.posts);

  return (
    <div>
      {posts.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '16px', fontWeight: 'bold' }}>
          "No posts available right now"
        </Typography>
      ) : (
        posts.map((post) => (
          <BlogPost key={post.id} post={post} onEdit={onEdit} />
        ))
      )}
    </div>
  );
};

export default BlogList;
