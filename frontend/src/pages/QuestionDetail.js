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

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');

  const { data: question, isLoading, error } = useQuery(['question', id], async () => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  });

  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery(['comments', 'question', id], async () => {
    const response = await api.get(`/comments/question/${id}`);
    return response.data;
  });

  const deleteQuestionMutation = useMutation(async () => {
    await api.delete(`/questions/${id}`);
  }, {
    onSuccess: () => {
      navigate('/questions');
    }
  });

  const createCommentMutation = useMutation(async (content) => {
    await api.post(`/comments/question/${id}`, { content });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'question', id]);
      setNewComment('');
    }
  });

  const deleteCommentMutation = useMutation(async (commentId) => {
    await api.delete(`/comments/${commentId}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', 'question', id]);
    }
  });

  if (isLoading || commentsLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error || commentsError) return <Typography color="error">An error occurred</Typography>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestionMutation.mutate();
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

  const user = getUserFromLocalStorage();

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>Question: {question.title}</Typography>
        <Box sx={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #ccc', p: 2, mb: 2 }}>
        <Typography variant="body1" paragraph>Description: {question.description}</Typography>
        </Box>
        {isTeacher() && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/questions/edit/${id}`)} sx={{ mr: 1 }}>Edit</Button>
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

export default QuestionDetail;
