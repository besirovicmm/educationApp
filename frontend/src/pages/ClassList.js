// pages/ClassList.js
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function ClassList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: classes, isLoading, error } = useQuery('classes', async () => {
    if (user.role === 'teacher') {
      const response = await api.get('/classes');
      return response.data;
    }
    return null;
  }, {
    enabled: user.role === 'teacher'
  });

  const handleClassSelect = (classId) => {
    localStorage.setItem('currentClassId', classId);
    navigate(`/class/${classId}`);
  };

  if (user.role === 'student') {
    return <Navigate to={`/class/${user.classId}`} />;
  }

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Classes
      </Typography>
      {user.role === 'teacher' ? (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/classes/create')}
            sx={{ mb: 2 }}
          >
            Create New Class
          </Button>
          <Paper elevation={3}>
            <List>
              {classes.map((cls) => (
                <ListItem
                  key={cls.id}
                  button
                  onClick={() => handleClassSelect(cls.id)}
                >
                  <ListItemText
                    primary={cls.name}
                    secondary={cls.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      ) : (
        <Typography>You don't have permission to view this page.</Typography>
      )}
    </Box>
  );
}

export default ClassList;
