import React, { useState } from 'react';
import '../categories/Categories.css';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

// bootStrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

// Mui icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function CategoryCard({ result, onClick, userName }) {
  let name = localStorage.getItem('name');
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(false);
  // for same user checking
  const [sameUser, setSameUser] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  const handleDeletePost = (index) => {
    console.log('triggered delete post button');
  };
  // const handleDeletePost = async () => {
  //   console.log('Deleting post with ID:');
  //   console.log('triggered delete post button');

  // try {
  //   // Make the API call to delete the post
  //   const response = await fetch(
  //     `${process.env.REACT_APP_REQ_URL}/recipe/${id}`,
  //     {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     // Deletion successful
  //     toast.success('Deleted recipe successfully 🚀👏', {
  //       position: toast.POSITION.TOP_CENTER,
  //     });

  //     console.log('recipe deleted successfully');
  //     // Update the state or perform any other necessary actions
  //     setDeletePost(true);
  //   } else {
  //     // Handle errors if the deletion was not successful
  //     toast.error('Failed to delete the recipe!', {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     console.error('Failed to delete the recipe');
  //   }
  // } catch (error) {
  //   // Handle any network or other errors
  //   console.error('Error occurred while deleting the post:', error);
  // }
  //};

  const FavoriteToTrue = () => {
    setFavorite(true);
  };
  const FavoriteToFalse = () => {
    setFavorite(false);
  };

  // for description
  function ScrollableParagraph({ text }) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }

  // get current user page from URL
  let splitURL = window.location.href.split('/');
  let currentUser = splitURL[splitURL.length - 1];

  // if the userName is the same set same user to true
  if (userName === currentUser) {
    setSameUser(true);
  }

  return (
    <>
      <Card className="card-hover" onClick={onClick}>
        <Container fluid>
          <Row>
            {/* Title and number of hearts */}
            <Col md={7}>
              <Row>
                <img src="hero.jpg" alt="pic" className="cardImg" />
              </Row>
              <Row>
                <Col xs={6}>
                  <h4 style={{ textAlign: 'left' }}>{result.recipe_title}</h4>
                </Col>

                <Col xs={6}>
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                </Col>
              </Row>

              <Row>
                {favorite ? (
                  <div className="d-flex align-items-center">
                    <div onClick={FavoriteToFalse}>
                      <FavoriteIcon
                        className="float-start"
                        style={{
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        color="error"
                      />{' '}
                      4
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <div onClick={FavoriteToTrue}>
                      <FavoriteBorderIcon
                        className="float-start"
                        style={{
                          marginLeft: 0,
                          marginRight: 'auto',
                          marginBottom: '10px',
                        }}
                        color="error"
                      />{' '}
                      3
                    </div>

                    <Button
                      variant="dark"
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        color: 'hsl(0, 83%, 39%)',
                        marginLeft: 0,
                        marginRight: 'auto',
                        marginBottom: '10px',
                      }}
                      // onClick={handleDeletePost(result.recipe_id)}
                      onClick={() => handleDeletePost(result.recipe_title)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </Row>
            </Col>

            {/* Right side */}
            <Col md={5}>
              <Row style={{ padding: '5px 0px' }}>
                <Col xs={4}>
                  <img src="user.ico" alt="user-icon" className="userImg" />
                </Col>
                <Col xs={8}>
                  <h5>{name}</h5>
                </Col>
              </Row>
              <Row>Description:</Row>
              <Row>
                <ScrollableParagraph text={result.recipe_description} />
              </Row>
            </Col>
          </Row>
        </Container>
      </Card>
      <ToastContainer />
    </>
  );
}

export default CategoryCard;
