import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getUserFromLocalStorage } from '../utils/userUtils';

const StyledLink = styled(RouterLink)({
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px',
});

function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = getUserFromLocalStorage();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Edu
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {user.name} ({user.role})
            </Typography>
          )}
          {user && user.role === 'teacher' && (
            <StyledLink to="/">Classes</StyledLink>
          )}
          {user && user.role === 'student' && (
            <StyledLink to={`/class/${user.classId}`}>My Class</StyledLink>
          )}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;