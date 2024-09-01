// pages/CreateLecture.js
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';

function CreateLecture() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await api.get('/classes');
      setClasses(response.data);
      const currentClassId = localStorage.getItem('currentClassId');
      if (currentClassId) {
        setClassId(currentClassId);
      }
    };
    fetchClasses();
  }, []);

  const createLectureMutation = useMutation(
    (lectureData) => api.post('/lectures', lectureData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lectures', classId]);
        navigate(`/class/${classId}`);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createLectureMutation.mutate({ title, content, classId });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create New Lecture</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Class</InputLabel>
            <Select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              label="Class"
              required
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Create Lecture
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateLecture;
