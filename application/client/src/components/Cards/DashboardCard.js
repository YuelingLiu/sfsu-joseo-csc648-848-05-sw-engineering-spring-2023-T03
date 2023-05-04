import React, { useState } from 'react';
import '../categories/Categories.css'

// bootStrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Mui icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function CategoryCard({result, onClick}) {
  const [value, setValue] = React.useState(2);
  const [favorite, setFavorite] = React.useState(false);

  const FavoriteToTrue = () => {
    setFavorite(true);
  }
  const FavoriteToFalse = () => {
    setFavorite(false);
  }

  // for description
  function ScrollableParagraph({text}) {
    return (
      <div style={{ overflow: 'auto', maxHeight: '170px' }}>
        <p>{text}</p>
      </div>
    );
  }

  return (
      <>
        <Card className="card-hover" onClick={onClick} >
            <Container fluid>
              <Row>
                {/* Title and number of hearts */}
                <Col md={7}>
                    <Row>
                      <img src='hero.jpg' alt='pic' className='cardImg'/>
                    </Row>
                    <Row>
                      <Col xs={6} >
                        <h4 style={{ textAlign: 'left'}}>
                          {result.recipe_title}
                        </h4>
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

                    <Row >
                      {(favorite) ? (
                        <div className="d-flex align-items-center">
                          <div onClick={FavoriteToFalse} >
                            <FavoriteIcon className="float-start" style={{ marginLeft: 0, marginRight: 'auto', marginBottom: '10px' }} color="error"/> 4
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <div onClick={FavoriteToTrue} >
                            <FavoriteBorderIcon className="float-start" style={{ marginLeft: 0, marginRight: 'auto', marginBottom: '10px' }} color="error"/> 3
                          </div>
                        </div>
                      )}
                    </Row>
                </Col>
                
                {/* Right side */}
                <Col md={5}>
                  <Row style={{padding: '5px 0px'}}>
                    <Col xs={4}>
                        <img src='user.ico' alt='user-icon' className='userImg'/>
                    </Col>
                    <Col xs={8}>
                        <h5>{result.username}</h5>
                    </Col>
                  </Row>
                  <Row>
                    Description:
                  </Row>
                  <Row>
                    <ScrollableParagraph text={result.recipe_description} />
                  </Row>
                </Col>

              </Row>
            </Container>
        </Card>
      </>
  )
}

export default CategoryCard