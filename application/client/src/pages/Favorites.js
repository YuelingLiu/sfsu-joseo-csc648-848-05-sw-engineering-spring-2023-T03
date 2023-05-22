import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';
import { useHistory } from 'react-router-dom';

import DashboardCard from '../components/Cards/DashboardCard';
import FilterbarStatic from '../components/filterbar/FilterbarStatic';

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Favorites = () => {
  const history = useHistory();

  const [savedRecipes, setSavedRecipes] = useState([]);

  const name = { recipe_title: 'Favorites' };
  let userID = localStorage.getItem('userId');
  userID = parseInt(userID, 10); // convert to integer then we can do comparisoon

  // get all saved recipes
  const getAllSavedRecipes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/${userID}/savedrecipes`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { savedRecipes } = await response.json();
      console.log('checking data in favorites:', savedRecipes);
      if (!response) {
        throw new Error(savedRecipes.error);
      } else {
        setSavedRecipes(savedRecipes);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getAllSavedRecipes();
  }, []);

  return (
    <>
      <FilterbarStatic title={name} />

      <Container style={{ maxWidth: '80%' }}>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {PostsData.map((data) => (
            <DashboardCard
              result={savedRecipes}
              onClick={() => history.push(`post/${data.id}`)}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
