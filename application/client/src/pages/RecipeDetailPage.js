import React, { useState, useEffect, useContext, useCallback } from 'react';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import { AuthContext } from '../AuthContext';
import Comment from '../components/Comments/Comment';
import CommentForm from '../components/Comments/CommentForm';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

// MUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RecipeDetailPage = (props) => {
  // for dummy star rating
  const [value, setValue] = React.useState(2);
  // login status
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [instructionDetails, setInstructionDetails] = useState([]);
  const [ingredientsDetails, setIngredientsDetails] = useState([]);
  const [recipeImg, setRecipeImg] = useState('image7');

  // for clickable favorite heart button
  const [favorite, setFavorite] = React.useState(false);
  const FavoriteToTrue = () => {
    setFavorite(true);
  };
  const FavoriteToFalse = () => {
    setFavorite(false);
  };

  // all for comments
  const postId = props.match.params.postId;
  const { token } = useContext(AuthContext);
  const [Comments, setComments] = useState([]);
  //fetching comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/post/${postId}/comments`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('comments arr: ' + data.data);
        setComments(data.data);
      } else {
        console.log('response was not okay');
        throw new Error(data.error);
      }
    } catch (err) {
      console.log('response threw error');
      console.log(err.message);
      console.error(err.message);
    }
  }, [postId]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  //fetching Recipe details
  const getRecipeDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/recipe/${postId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('recipe details okay');
        console.log(JSON.stringify(data));
        console.log(
          'checking what is user id in post detials page,',
          data.recipe.user_id
        );
        setRecipeDetails(data.recipe);
        console.log(
          'checking recipe details now ',
          JSON.stringify(recipeDetails)
        );
        setInstructionDetails(data.instructions);
        setIngredientsDetails(data.ingredients);

        if (data.recipe.photo_url) {
          setRecipeImg(data.recipe.photo_url);
        } else {
          setRecipeImg('image7.png');
        }
      } else {
        console.log('response was not okay');
        throw new Error(data.error);
      }
    } catch (err) {
      console.log('response threw error');
      console.log(err.message);
      console.error(err.message);
    }
  };
  useEffect(() => {
    getRecipeDetails();
  }, [postId]);
  // using sepearate single dependency array
  useEffect(() => {
    console.log('recipe details have been updated:', recipeDetails);
    // Perform actions that rely on updated recipeDetails here
  }, [recipeDetails]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().substr(-2);
    return month + '/' + day + '/' + year;
  };
  const formattedDate = formatDate(recipeDetails.created_at);

  // conver '90' mins into hour min format
  function convertToHoursAndMinutes(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  }
  const formattedTime = convertToHoursAndMinutes(recipeDetails.cooking_time);

  return (
    <>
      <Container>
        <Row>
          {/* left side of page */}
          <Col md={7}>
            <Row>
              {recipeImg ? (
                <img src={recipeImg} alt="pic" />
              ) : (
                <img src="image7.jpg" alt="pic" />
              )}
            </Row>
            <Button
              style={{
                color: 'white',
                backgroundColor: 'hsl(0, 83%, 39%)',
                width: '30%',
                marginTop: '2px',
                textTransform: 'uppercase',
              }}
            >
              Save
            </Button>

            {/* detail row */}

            <Row>
              <Col md={7}>
                {/* cooking time */}
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Cooking time:
                    </h4>
                    <h4> {formattedTime}</h4>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Difficulty:
                    </h4>
                    <h4>{recipeDetails.difficulty}</h4>
                  </div>
                </div>
                {/* ingredients */}
                <h4 style={{ fontWeight: '700' }}>ingredients list:</h4>
                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                {ingredientsDetails.map((ingredientDetail, index) => {
                  return (
                    <div key={index}>
                      <p>
                        - {ingredientDetail.amount}{' '}
                        {ingredientDetail.ingredient}
                      </p>
                    </div>
                  );
                })}

                {/* description */}
                <h4 style={{ fontWeight: '700', padding: '10px' }}>
                  Description:
                </h4>
                <h4>{recipeDetails.description}</h4>
              </Col>

              <Col md={5}>
                {/* recipe instructions */}
                <h4 style={{ fontWeight: '700' }}>Recipe Instructions:</h4>

                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                {instructionDetails.map((instructionDetail, index) => {
                  return (
                    <div key={index}>
                      <h4 style={{ fontWeight: '600' }}>Step {index + 1}:</h4>
                      <p>{instructionDetail.instruction}</p>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>

          {/* right side of page */}
          <Col md={5}>
            <Row className="justify-content-center">
              <Col xs={6}>
                <h3 style={{ fontWeight: 'bold' }}>{recipeDetails.title}</h3>
              </Col>

              <Col xs={6}>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    paddingTop: '10px',
                  }}
                  style={{ paddingTop: '10px' }}
                >
                  <Rating name="read-only" value={value} readOnly />
                </Box>
              </Col>
            </Row>

            <Row
              className="justify-content-center"
              style={{ marginBottom: '25px' }}
            >
              <Col xs={6}>
                {favorite ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      onClick={FavoriteToFalse}
                    >
                      <FavoriteIcon
                        className="float-start"
                        style={{ marginRight: '5px', fontSize: '2rem' }}
                        color="error"
                      />
                      <h3 style={{ fontWeight: 'bold' }}>4</h3>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center"
                      onClick={FavoriteToTrue}
                    >
                      <FavoriteBorderIcon
                        className="float-start"
                        style={{ marginRight: '5px', fontSize: '2rem' }}
                        color="error"
                      />
                      <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        3
                      </h3>
                    </div>
                  </div>
                )}
              </Col>

              <Col xs={6}>
                <h4 style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {formattedDate}
                </h4>
              </Col>
            </Row>

            <Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProfileCard showDetails userDetails={recipeDetails} />
              </div>
            </Row>

            {/* comment section  */}
            {loggedIn ? (
              <Row>
                <CommentForm
                  token={token}
                  postId={postId}
                  fetchComments={fetchComments}
                />
              </Row>
            ) : (
              <> </>
            )}

            <Row>
              {/* map through comments */}
              {Comments.map((data, index) => (
                <Comment
                  key={index}
                  author={data.username}
                  date={data.username}
                  text={data.comment}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeDetailPage;
