import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RecentPostCard from '../Cards/RecentPostCard'

const RecentPost = () => {
  const history = useHistory();
  const [recentPostData, setRecentPostData] = useState([])
  const [count, setCount] = useState(0)

  // render recent post
  const getRecentPost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REQ_URL}/recipe/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json()
  
      if (!response) {
        throw new Error(data.error);
      } else {
        let reversedData = data.recipes.reverse();
        console.log('recent post response ok');
        setRecentPostData(reversedData);
      }
    } catch (err) {
      console.log("error in recent post: " + err.message);
    }
  }

  useEffect(() => {
    getRecentPost()
  }, [count])


  const handleRecentCardClick = (recipe_id) => {
    console.log("recipe_i: " , recipe_id);
    history.push(`/post/${recipe_id}`);
  };

  return (
    <div>
      {/* send recent post to card to render */}
      <Container style={{ maxWidth: '80%' }}>
        <Row>
            <Col xl={12}>
              <h2 className='title'>Recent Dishes</h2>
            </Col>
        </Row>

        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {recentPostData.map(data => (
              <RecentPostCard result={data} setCount={setCount} onClick={() => handleRecentCardClick(data.recipe.id)} userName={data.recipe.user_id}/>
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default RecentPost