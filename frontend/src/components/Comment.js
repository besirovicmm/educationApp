// src/components/Comment.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const CommentHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
});

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const RoleChip = styled(Chip)(({ theme, role }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: role === 'teacher' ? theme.palette.secondary.main : theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const Comment = ({ comment, onDelete, onEdit, currentUserId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const isAuthor = currentUserId === comment.userId;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(comment.id);
    handleMenuClose();
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  return (
    <StyledCard>
      <CardContent>
        <CommentHeader>
          <UserInfo>
            <Avatar alt={comment.userName} src={comment.userAvatar} />
            <Box ml={1}>
              <Typography variant="subtitle1">{comment.userName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(comment.created_at).toLocaleString()}
              </Typography>
            </Box>
            <RoleChip
              label={comment.userRole}
              size="small"
              role={comment.userRole}
            />
          </UserInfo>
          {isAuthor && (
            <div>
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </CommentHeader>
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Box mt={1}>
              <Button onClick={handleSaveEdit} color="primary" variant="contained" size="small" sx={{ mr: 1 }}>
                Save
              </Button>
              <Button onClick={handleCancelEdit} color="secondary" variant="outlined" size="small">
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">{comment.content}</Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default Comment;