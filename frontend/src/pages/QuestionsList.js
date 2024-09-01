import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Typography, List, ListItem, ListItemText, Button, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function QuestionsList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: questions, isLoading, error } = useQuery('questions', async () => {
    const response = await api.get('/questions', {
      params: user.role === 'student' ? { classId: user.classId } : {}
    });
    return response.data;
  });

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>
      {user.role === 'teacher' && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/questions/create')}
          sx={{ mb: 2 }}
        >
          Create New Question
        </Button>
      )}
      <List>
        {questions.map((question) => (
          <ListItem
            key={question.id}
            button
            onClick={() => navigate(`/questions/${question.id}`)}
          >
            <ListItemText
              primary={question.title}
              secondary={`Created by: ${question.teacherId}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default QuestionsList;
