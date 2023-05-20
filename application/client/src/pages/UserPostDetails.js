import React, { useState, useEffect, useContext, useCallback } from 'react';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import { AuthContext } from '../AuthContext';
import Comment from '../components/Comments/Comment';
import CommentForm from '../components/Comments/CommentForm';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// MUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// POST details
import PostDetails from './PostDetails';

const UserPostDetails = () => {
  return (
    <>
      <PostDetails />
    </>
  );
};

export default UserPostDetails;
