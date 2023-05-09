import React, { useState, useEffect, useContext } from 'react';
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

const PostDetailsPage = (props) => {
  // for dummy star rating
  const [value, setValue] = React.useState(2);
  // login status
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

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
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_REQ_URL}/post/${postId}/comments`);
        console.log("server response: ", response); 
        const data = await response.json();

        if (response.ok) {
          setComments(data.comments);
          console.log(comments);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.log(err.message);
        console.error(err.message);
      }
    };

    fetchComments();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {/* left side of page */}
          <Col md={7}>
            {/* img row*/}
            <Row>
              <img src={`${process.env.PUBLIC_URL}/hero.jpg`} alt="pic" />
            </Row>

            {/* detail row */}
            <Row>
              <Col md={7}>
                {/* cooking time */}
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Cooking time:
                    </h4>
                    <h4> 2h 30m</h4>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <h4 style={{ marginRight: '5px', fontWeight: '700' }}>
                      Difficulty:
                    </h4>
                    <h4> Easy</h4>
                  </div>
                </div>
                {/* ingredients */}
                <h4 style={{ fontWeight: '700' }}>ingredients list:</h4>
                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                {/* description */}
                <h4 style={{ fontWeight: '700', padding: '10px' }}>
                  Description:
                </h4>
                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </h4>
              </Col>

              <Col md={5}>
                {/* recipe instructions */}
                <h4 style={{ fontWeight: '700' }}>Recipe Instructions:</h4>

                {/* MAP THROUGH A COMPONENT FOR PROPER DESIGN */}
                <h4 style={{ fontWeight: '600' }}>Step 1:</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>

                <h4 style={{ fontWeight: '600' }}>Step 2:</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>

                <h4 style={{ fontWeight: '600' }}>Step 3:</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
                <h4>- Lorem ipsum dolor sit amet</h4>
              </Col>
            </Row>
          </Col>

          {/* right side of page */}
          <Col md={5}>
            <Row className="justify-content-center">
              <Col xs={6}>
                <h3 style={{ fontWeight: 'bold' }}>Chicken Tikka Masala</h3>
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
                  mm/dd/yy
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
                <ProfileCard showDetails />
              </div>
            </Row>

            {/* comment section  */}
            {loggedIn ? (
              <Row>
                <CommentForm token={token} postId={postId} />
              </Row>
            ) : (
              <> </>
            )}

            <Row>
              {/* map through comments */}
                <Comment author='Duncan'  date='05/09/2023' text='LORFHDJSAFHDJSAFHDASJFBDASBVCDSAHFSAJLHFDASJL'/>
            </Row>
         
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostDetailsPage;
