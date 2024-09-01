import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Box, 
  CircularProgress,
  Paper,
  Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getUserFromLocalStorage } from '../utils/userUtils';

function ClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();

  const { data: classData, isLoading: classLoading, error: classError } = useQuery(['class', classId], async () => {
    const response = await api.get(`/classes/${classId}`);
    return response.data;
  });

  const { data: lectures, isLoading: lecturesLoading, error: lecturesError } = useQuery(['lectures', classId], async () => {
    const response = await api.get(`/lectures`, { params: { classId } });
    return response.data;
  });

  const { data: assignments, isLoading: assignmentsLoading, error: assignmentsError } = useQuery(['assignments', classId], async () => {
    const response = await api.get(`/assignments`, { params: { classId } });
    return response.data;
  });

  const { data: questions, isLoading: questionsLoading, error: questionsError } = useQuery(['questions', classId], async () => {
    const response = await api.get(`/questions`, { params: { classId } });
    return response.data;
  });

  if (classLoading || lecturesLoading || assignmentsLoading || questionsLoading) 
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (classError || lecturesError || assignmentsError || questionsError) 
    return <Typography color="error">An error occurred</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Class: {classData.name}</Typography>
      <Typography variant="body1" paragraph>Description: {classData.description}</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Lectures</Typography>
            {user.role === 'teacher' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/lectures/create', { state: { classId } })}
                sx={{ mb: 2 }}
              >
                Add Lecture
              </Button>
            )}
            <List>
              {lectures.map((lecture) => (
                <ListItem 
                  key={lecture.id} 
                  button 
                  onClick={() => navigate(`/lectures/${lecture.id}`)}
                >
                  <ListItemText primary={lecture.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Assignments</Typography>
            {user.role === 'teacher' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/assignments/create', { state: { classId } })}
                sx={{ mb: 2 }}
              >
                Add Assignment
              </Button>
            )}
            <List>
              {assignments.map((assignment) => (
                <ListItem 
                  key={assignment.id} 
                  button 
                  onClick={() => navigate(`/assignments/${assignment.id}`)}
                >
                  <ListItemText primary={assignment.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Questions</Typography>
            {user.role === 'teacher' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/questions/create', { state: { classId } })}
                sx={{ mb: 2 }}
              >
                Add Question
              </Button>
            )}
            <List>
              {questions.map((question) => (
                <ListItem 
                  key={question.id} 
                  button 
                  onClick={() => navigate(`/questions/${question.id}`)}
                >
                  <ListItemText primary={question.title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {user.role === 'teacher' && (
        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h5" gutterBottom>Students</Typography>
          {/* Add a list of students here */}
        </Paper>
      )}
    </Box>
  );
}

export default ClassDetail;