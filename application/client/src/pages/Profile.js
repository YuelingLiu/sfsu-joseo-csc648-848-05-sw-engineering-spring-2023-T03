import React, {useEffect, useState} from 'react';

import { useHistory } from "react-router-dom";
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';
import PopularDIshesCards from '../components/Cards/PopularDIshesCards'
import ProfileCard from '../components/ProfileCard/ProfileCard';
import DashboardCard from '../components/Cards/DashboardCard'

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const history = useHistory();
  // get username 
  let name = localStorage.getItem('name');


  // const getUserPost = async() => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/profile/${name}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = response.json()

  //     if (!response) {
  //       console.error('Failed fetch recipe for profile');
  //     } else {
  //       console.log("profile: " + JSON.stringify(data));
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  // useEffect(() => {
  //   getUserPost()
  // }, [])

  return (
    <>
      <Container style={{ maxWidth: '80%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ProfileCard showDetails userName={name}/>
            <Typography style={{margin: '25px 15px 0px 0px'}} variant='h5'>{name} Posts</Typography>
          </div>
          
          {/* <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {PostsData.map(data => (
              <DashboardCard userName={name} result={data} onClick={() => history.push(`post/${data.id}`)} />
            ))}
          </Row> */}
      </Container>
    </>
  )
}

export default Profile;