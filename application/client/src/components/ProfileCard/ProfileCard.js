import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ProfileCard({ showDetails, userName,userDetails }) {
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
  console.log(JSON.stringify(userDetails));
  // console.log(userDetails.id);
  // useEffect(() => {
  //   const getProfileImg = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_REQ_URL}/user/${userID}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       const user = data; // Assuming the profile image is accessible directly from the data response
  //       console.log('-----what is user image profile,', user.profile_picture);
  //       console.log('Checking what is data', JSON.stringify(data));
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch profile image');
  //       } else {
  //         setProfileImg(user.profile_picture);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   getProfileImg();  // you need to call the function
  // }, [userName, currentUser]); // Dependency array was missing

    
    // console.log("username in profile card: " + userName);
    // console.log('userdetails: ',userDetails.user_id);
    const [profileUsername, setUsername] = useState('')
    let currentPostProfileUserID = userDetails.id
    
    console.log('currentPostProfileUserID: ', currentPostProfileUserID);
    useEffect (() => {
      const getUserPost = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/${currentPostProfileUserID}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const user = await response.json()
            
            console.log('-----what is user image profile,', user.profile_picture);
            console.log('Checking what is data', JSON.stringify(user));

            if (!response.ok) {
                throw new Error('Failed to fetch profile image');
            } 
            
            setUsername(user.username)
            setProfileImg(user.profile_picture);
            
        } catch (err) {
          console.log(err.message);
        }
      }
  
      getUserPost()
    }, [userID])

    // console.log("this is name: ",profileUsername);

    // for following 
    // const [profileUserID, setProf ileUserID] = useState([])
    const handleFollowUser = async () => {
        try {
            // console.log('body: ', JSON.stringify(formData));
            // send current post owner userID
            const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/follow/${currentPostProfileUserID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the currently logged in userID 
                body: JSON.stringify({
                    userID: userID
                }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Response ERROR');
            } 

            console.log('DATA: ', data);
        } catch (error) {
            console.log('Error message: ' + error.message);
        }
    }

    // FOLLOWERS
    const [FollowerData, setFollowerData] = useState([])
    useEffect (() => {
        const getUserfollowers = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/followers `,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const data = await response.json()
    
            if (!response) {
              console.error('Failed fetch recipe for profile');
            } else {
                setFollowerData(data)
            }
          } catch (err) {
            console.log(err.message);
          }
        }
    
        // getUserfollowers()
      }, [userID])

    //FOLLOWING
    const [followingData, setFollowingData] = useState([])
    useEffect (() => {
        const getUserfollowing = async () => {
            try {
            const response = await fetch(`${process.env.REACT_APP_REQ_URL}/user/following`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            const data = await response.json()

            if (!response) {
                console.error('Failed fetch recipe for profile');
            } else {
                setFollowingData(data)
            }
            } catch (err) {
            console.log(err.message);
            }
        }

    // getUserfollowing()
    }, [userID])


    // need to make an if for if the user is following show unFOLLOW
    return (
        <>
            <Card sx={{ width: 320, marginLeft: 2.5 }}>
                <CardHeader />
                <Avatar
                    alt={profileUsername}
                    src={profileImg}
                    sx={{ width: 180, height: 180, margin: '0 auto' }}
                />
                <CardContent>
                    <Typography variant="h5" style={{ textAlign: 'center', margin: '10px 0' }}>{profileUsername}</Typography>
                    {
                        showDetails ?
                            <>
                                <div className='d-flex items-center justify-content-evenly'>
                                    <Typography variant="subtitle1">## Followers</Typography>
                                    <Typography variant="subtitle1">## Following</Typography>
                                </div>

                                {/* if true we dont want the follow button */}
                                {sameUser ? (
                                    <>
                                    </>
                                )  : (
                                    <>
                                        <div className='d-flex justify-content-center mt-2'>
                                            <Button variant="contained" onClick={handleFollowUser}>Follow</Button>
                                        </div>
                                    </>
                                )}
                            </>
                            :
                            null
                    }
                </CardContent>
            </Card>
        </>
    );
}
export default ProfileCard;
