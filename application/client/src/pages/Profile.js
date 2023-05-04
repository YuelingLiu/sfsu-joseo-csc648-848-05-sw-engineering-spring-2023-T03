import React from 'react';
import { useHistory } from "react-router-dom";
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import DashboardCard from '../components/Cards/DashboardCard'
// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const history = useHistory();
  return (
    <>
      <Container style={{ maxWidth: '80%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ProfileCard showDetails />
            <Typography style={{margin: '25px 15px 0px 0px'}} variant='h5'>User's Posts</Typography>
          </div>
          
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {PostsData.map(data => (
              <DashboardCard result={data} onClick={() => history.push(`post/${data.id}`)} />
            ))}
          </Row>
      </Container>
    </>
  )
}

export default Profile