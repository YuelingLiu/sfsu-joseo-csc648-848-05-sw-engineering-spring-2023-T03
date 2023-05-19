import React, {useEffect, useState} from 'react';

import { useHistory } from "react-router-dom";
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';
import PopularDIshesCards from '../components/Cards/PopularDIshesCards'
import ProfileCard from '../components/ProfileCard/ProfileCard';
import DashboardCard from '../components/Cards/DashboardCard'
import ProfileCards from '../components/Cards/ProfileCards'
// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const history = useHistory();
  // get username 
  let name = localStorage.getItem('name');
  let userID = localStorage.getItem('userId');
  const [profileData, setData] = useState([])

  // user post 
  useEffect (() => {
    const getUserPost = async () => {
      console.log('inside');
      try {
        // CHANGE USERID FOR USERID FROM THE fetchUser TO GET THE ACTUAL OWNERS POST
        const response = await fetch(`${process.env.REACT_APP_REQ_URL}/recipe/user/${userID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()

        if (!response) {
          console.error('Failed fetch recipe for profile');
        } 

        console.log('data.recipes ', data.recipes);
        setData(data.recipes)
        
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserPost()
  }, [userID])


  
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const username = window.location.pathname.split('/').pop();
      const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/username/${username}`);

      if (response.ok) {
        const user = await response.json();
        console.log(JSON.stringify(user));
        setUserData(user);
      } else {
        console.error('Failed to fetch user');
      }
    };

    fetchUser();
  }, []);

  console.log("userData: ",userData);
  console.log('profileData ' ,profileData);
  return (
    <>
      <Container style={{ maxWidth: '80%' }}>
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ProfileCard showDetails userName={name} id={userID} userDetails={userData}/>
          </div> */}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography style={{margin: '25px 15px 0px 0px'}} variant='h5'>{name} Posts</Typography>
          </div>

          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {profileData.map(data => (
              <ProfileCards result={data} />
            ))}
          </Row>
      </Container>
    </>
  )
}

export default Profile;