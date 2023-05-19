import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ProfileCard({ showDetails, userName }) {
  // for same user checking
  const [sameUser, setSameUser] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  let userID = localStorage.getItem('userId');
  // get current user page from URL
  let splitURL = window.location.href.split('/');
  let currentUser = splitURL[splitURL.length - 1];

  useEffect(() => {
    // if the userName is the same set same user to true
    if (userName === currentUser) {
      setSameUser(true);
    }
  }, [userName, currentUser]); // Update sameUser only when userName or currentUser change

  useEffect(() => {
    const getProfileImg = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/user/${userID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        const user = data; // Assuming the profile image is accessible directly from the data response
        console.log('-----what is user image profile,', user.profile_picture);
        console.log('Checking what is data', JSON.stringify(data));
        if (!response.ok) {
          throw new Error('Failed to fetch profile image');
        } else {
          setProfileImg(user.profile_picture);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getProfileImg();
  }, [userID]);

  return (
    <>
      <Card sx={{ width: 320, marginLeft: 2.5 }}>
        <CardHeader />
        <Avatar
          alt={userName.toUpperCase()}
          src={profileImg}
          sx={{ width: 180, height: 180, margin: '0 auto' }}
        />
        <CardContent>
          <Typography
            variant="h5"
            style={{ textAlign: 'center', margin: '10px 0' }}
          >
            {userName}
          </Typography>
          {showDetails ? (
            <>
              <div className="d-flex items-center justify-content-evenly">
                <Typography variant="subtitle1">## Followers</Typography>
                <Typography variant="subtitle1">## Following</Typography>
              </div>

              {/* if true we dont want the follow button */}
              {sameUser ? (
                <></>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-2">
                    <Button variant="contained">Follow</Button>
                  </div>
                </>
              )}
            </>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
export default ProfileCard;
