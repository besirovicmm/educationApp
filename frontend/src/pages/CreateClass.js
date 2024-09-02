// pages/CreateClass.js
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';

function CreateClass() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createClassMutation = useMutation(
    (classData) => api.post('/classes', classData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classes');
        navigate('/');
      },
      onError: (error) => {
        console.error('Failed to create class:', error);
        // You might want to show an error message to the user here
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createClassMutation.mutate({ name, description });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Create New Class
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Class Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={createClassMutation.isLoading}
          >
            {createClassMutation.isLoading ? <CircularProgress size={24} /> : 'Create Class'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateClass;