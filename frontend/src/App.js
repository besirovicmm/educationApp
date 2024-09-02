// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ClassList from './pages/ClassList';
import ClassDetail from './pages/ClassDetail';
import LecturesList from './pages/LecturesList';
import LectureDetail from './pages/LectureDetail';
import CreateLecture from './pages/CreateLecture';
import AssignmentsList from './pages/AssignmentsList';
import AssignmentDetail from './pages/AssignmentDetail';
import CreateAssignment from './pages/CreateAssignment';
import QuestionsList from './pages/QuestionsList'; 
import QuestionDetail from './pages/QuestionDetail'; 
import CreateQuestion from './pages/CreateQuestion'; 
import UserRegistration from './components/UserRegistration';
import PrivateRoute from './components/PrivateRoute';


const queryClient = new QueryClient();

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/" element={<ClassList />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              {user && user.role === 'teacher' ? <ClassList /> : <Navigate to={`/class/${user?.classId}`} />}
            </PrivateRoute>
          } 
        />
        <Route 
          path="/class/:classId" 
          element={<PrivateRoute><ClassDetail /></PrivateRoute>} 
        />
        <Route 
          path="/lectures" 
          element={<PrivateRoute><LecturesList /></PrivateRoute>} 
        />
        <Route 
          path="/lectures/:id" 
          element={<PrivateRoute><LectureDetail /></PrivateRoute>} 
        />
        <Route 
          path="/lectures/create" 
          element={
            <PrivateRoute>
              {user && user.role === 'teacher' ? <CreateLecture /> : <Navigate to="/" />}
            </PrivateRoute>
          } 
        />
        <Route 
          path="/assignments" 
          element={<PrivateRoute><AssignmentsList /></PrivateRoute>} 
        />
        <Route 
          path="/assignments/:id" 
          element={<PrivateRoute><AssignmentDetail /></PrivateRoute>} 
        />
        <Route 
          path="/assignments/create" 
          element={
            <PrivateRoute>
              {user && user.role === 'teacher' ? <CreateAssignment /> : <Navigate to="/" />}
            </PrivateRoute>
          } 
        />
        <Route
          path="/questions"
          element={<PrivateRoute><QuestionsList /></PrivateRoute>}
        />
        <Route
          path="/questions/:id"
          element={<PrivateRoute><QuestionDetail /></PrivateRoute>}
        />
        <Route
          path="/questions/create"
          element={
            <PrivateRoute>
              {user && user.role === 'teacher' ? <CreateQuestion /> : <Navigate to="/" />}
            </PrivateRoute>
          }
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;