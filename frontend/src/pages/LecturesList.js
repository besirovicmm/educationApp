// pages/LecturesList.js
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Typography, List, ListItem, ListItemText, Button, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function LecturesList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: lectures, isLoading, error } = useQuery('lectures', async () => {
    const response = await api.get('/lectures', {
      params: user.role === 'student' ? { classId: user.classId } : {}
    });
    return response.data;
  });

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lectures
      </Typography>
      {user.role === 'teacher' && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/lectures/create')}
          sx={{ mb: 2 }}
        >
          Create New Lecture
        </Button>
      )}
      <List>
        {lectures.map((lecture) => (
          <ListItem
            key={lecture.id}
            button
            onClick={() => navigate(`/lectures/${lecture.id}`)}
          >
            <ListItemText 
              primary={lecture.title}
              secondary={`Date: ${new Date(lecture.created_at).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LecturesList;