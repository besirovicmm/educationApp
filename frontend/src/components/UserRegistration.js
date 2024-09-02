// frontend/src/components/UserRegistration.js
import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';

function UserRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const registerMutation = useMutation(
    (userData) => api.post('/users/register', userData),
    {
      onSuccess: () => {
        alert('User registered successfully');
        navigate('/login');
      },
      onError: (error) => {
        alert(`Registration failed: ${error.response?.data?.message || 'Unknown error'}`);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { 
      username, 
      password, 
      name,
      role
    };
    if (role === 'student') {
      userData.classId = classId;
    }
    registerMutation.mutate(userData);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value === 'teacher') {
                  setClassId('');
                }
              }}
              required
            >
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          {role === 'student' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Class</InputLabel>
              <Select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserRegistration;