import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ProfileCard({ showDetails, userDetails: { user_id } }) {
  // console.log('what is ser details', userDetails);
  // for same user checking
  const [sameUser, setSameUser] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profileUsername, setProfileUsername] = useState('');
  let userID = localStorage.getItem('userId');
  console.log('checking what is userID here in profileCard', user_id);
  // get current user page from URL
  let splitURL = window.location.href.split('/');
  let currentUser = splitURL[splitURL.length - 1];

  useEffect(() => {
    // if the userName is the same set same user to true

    if (userID === user_id) {
      setSameUser(true);
    }
  }, [user_id]); // Update sameUser only when userName or currentUser change

  // this is just too get user profile_picture and username
  useEffect(() => {
    const getImgAndName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/user/${user_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        const user = data; // Assuming the profile image is accessible directly from the data response
        if (!response.ok) {
          throw new Error('Failed to fetch profile image');
        } else {
          setProfileImg(user.profile_picture);
          setProfileUsername(user.username);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getImgAndName(); // you need to call the function
  }, [user_id]); // Dependency array was missing

  // console.log('username in profile card: ' + userName);
  // console.log('userdetails: ', userDetails.user_id);

  //let currentPostProfileUserID = userDetails.id;

  // console.log('currentPostProfileUserID: ', currentPostProfileUserID);
  // useEffect(() => {
  //   const getUserPost = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_REQ_URL}/user/${currentPostProfileUserID}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       const user = await response.json();

  //       console.log('-----what is user image profile,', user.profile_picture);
  //       console.log('Checking what is data', JSON.stringify(user));

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch profile image');
  //       }

  //       setPrifleUsername(user.username);
  //       setProfileImg(user.profile_picture);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   getUserPost();
  // }, [userID]);

  // console.log("this is name: ",profileUsername);

  // for following
  // const [profileUserID, setProf ileUserID] = useState([])
  const handleFollowUser = async () => {
    try {
      // console.log('body: ', JSON.stringify(formData));
      // send current post owner userID
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/follow/${user_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the currently logged in userID
          body: JSON.stringify({
            userID: user_id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Response ERROR');
      }
      console.log('DATA: ', data);
      toast.success(`Hurray!you followed  ${profileUsername}! 🍾🎉♨`, {
        position: toast.POSITION.TOP_CENTER,
        duration: 3000, // 3s
      });
    } catch (error) {
      console.log('Error message: ' + error.message);
    }
  };

  // FOLLOWERS
  const [FollowerData, setFollowerData] = useState([]);
  useEffect(() => {
    const getUserfollowers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/user/followers `,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        if (!response) {
          console.error('Failed fetch recipe for profile');
        } else {
          setFollowerData(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // getUserfollowers()
  }, [user_id]);

  //FOLLOWING
  const [followingData, setFollowingData] = useState([]);
  useEffect(() => {
    const getUserfollowing = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/user/following`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        if (!response) {
          console.error('Failed fetch recipe for profile');
        } else {
          setFollowingData(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // getUserfollowing()
  }, [user_id]);

  // need to make an if for if the user is following show unFOLLOW
  return (
    <>
      <Card sx={{ width: 320, marginLeft: 2.5 }}>
        <CardHeader />
        <Avatar
          alt={currentUser}
          src={profileImg}
          sx={{ width: 180, height: 180, margin: '0 auto' }}
        />
        <CardContent>
          <Typography
            variant="h5"
            style={{ textAlign: 'center', margin: '10px 0' }}
          >
            {profileUsername}
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
                    <Button variant="contained" onClick={handleFollowUser}>
                      Follow
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : null}
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
export default ProfileCard;
