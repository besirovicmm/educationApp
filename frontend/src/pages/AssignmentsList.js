// pages/AssignmentsList.js
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Typography, List, ListItem, ListItemText, Button, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function AssignmentsList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: assignments, isLoading, error } = useQuery('assignments', async () => {
    const response = await api.get('/assignments', {
      params: user.role === 'student' ? { classId: user.classId } : {}
    });
    return response.data;
  });

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>
      {user.role === 'teacher' && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/assignments/create')}
          sx={{ mb: 2 }}
        >
          Create New Assignment
        </Button>
      )}
      <List>
        {assignments.map((assignment) => (
          <ListItem
            key={assignment.id}
            button
            onClick={() => navigate(`/assignments/${assignment.id}`)}
          >
            <ListItemText 
              primary={assignment.title}
              secondary={`Due Date: ${new Date(assignment.dueDate).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AssignmentsList;