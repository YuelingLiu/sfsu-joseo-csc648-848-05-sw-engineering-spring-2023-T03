import React, { useState, useEffect} from 'react';

// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RecentPostCard from '../Cards/RecentPostCard'

const RecentPost = () => {
  const [recentPostData, setRecentPostData] = useState([])

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
        console.log(data.recipes);
        let reversedData = data.recipes.reverse();
        console.log(reversedData);
        console.log('recent post response ok');
        setRecentPostData(reversedData);
      }
    } catch (err) {
      console.log("error in recent post: " + err.message);
    }
    
  }

  useEffect(() => {
    getRecentPost()
  }, [])

  console.log(recentPostData);

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
              <RecentPostCard result={data}/>
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default RecentPost