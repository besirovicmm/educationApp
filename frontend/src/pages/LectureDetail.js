// pages/LectureDetail.js
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isTeacher, getUserFromLocalStorage } from '../utils/userUtils';
import Comment from '../components/Comment';
import { 
  Typography, 
  Button, 
  Box, 
  CircularProgress,
  Paper,
  TextField,
  List,
  ListItem,
  Divider
} from '@mui/material';

function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');


  const editCommentMutation = useMutation(async ({ commentId, content }) => {
    await api.put(`/comments/${commentId}`, { content });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'lecture', id]);
    }
  });
  const { data: lecture, isLoading, error } = useQuery(['lecture', id], async () => {
    const response = await api.get(`/lectures/${id}`);
    return response.data;
  });

  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(['comments', 'lecture', id], async () => {
    const response = await api.get(`/comments/lecture/${id}`);
    return response.data;
  });

  const deleteLectureMutation = useMutation(async () => {
    await api.delete(`/lectures/${id}`);
  }, {
    onSuccess: () => {
      navigate('/lectures');
    }
  });

  const createCommentMutation = useMutation(async (content) => {
    await api.post(`/comments/lecture/${id}`, { content });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'lecture', id]);
      setNewComment('');
    }
  });

  const deleteCommentMutation = useMutation(async (commentId) => {
    await api.delete(`/comments/${commentId}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'lecture', id]);
    }
  });

  if (isLoading || commentsLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error || commentsError) return <Typography color="error">An error occurred</Typography>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      deleteLectureMutation.mutate();
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createCommentMutation.mutate(newComment);
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const handleCommentEdit = (commentId, newContent) => {
    editCommentMutation.mutate({ commentId, content: newContent });
  };
  const user = getUserFromLocalStorage();

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>{lecture.title}</Typography>
        <Box sx={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #ccc', p: 2, mb: 2 }}>
          <Typography variant="body1" paragraph>{lecture.content}</Typography>
        </Box>
       <Typography variant="body2">Date: {new Date(lecture.created_at).toLocaleDateString()}</Typography>
        
        {isTeacher() && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/lectures/edit/${id}`)} sx={{ mr: 1 }}>Edit</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </Box>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Comments</Typography>
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem>
                <Comment
                  comment={comment}
                  onDelete={handleCommentDelete}
                  onEdit={handleCommentEdit}
                  currentUserId={user.id}
                />
              </ListItem>
              {index < comments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <form onSubmit={handleCommentSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Post Comment
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LectureDetail;