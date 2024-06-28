import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Grid, Paper, Button } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import CustomSwitch from './CustomSwitch';

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleCreateClick = () => {
    setCurrentPost({ title: '', content: '', image: null });
    setEditorVisible(true);
  };

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setEditorVisible(true);
  };

  const handleSave = () => {
    setEditorVisible(false);
    setCurrentPost(null);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ paddingTop: '20px' }}>
          <Grid item>
            <Button onClick={handleCreateClick} variant="contained" color="primary" sx={{ padding: '12px' }}>
              Create
            </Button>
          </Grid>
          <Grid item>
            <CustomSwitch checked={darkMode} onChange={toggleTheme} />
          </Grid>
        </Grid>
        {isEditorVisible && (
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
            <BlogEditor post={currentPost} onSave={handleSave} />
          </Paper>
        )}
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <BlogList onEdit={handleEditClick} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
