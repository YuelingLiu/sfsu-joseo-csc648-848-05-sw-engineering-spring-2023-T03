import * as React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import Box from '@mui/material/Box';
import { palette } from '@mui/system';


function UserFollowsCard() {
    //dummy data, leter we will go into session to get this object
    const user =  {
        "user_id": 2,
        "following_user": 1,
        "id": 1,
        "username": "nate",
        "email": "nate@email.com",
        "password": "$2b$10$q5yXtDVCra0b8qfJlC8CCuNph4jIFFvvQAqpoTRftoc6s9lY25DYi",
        "profile_picture": "https://recipereel.s3.us-west-1.amazonaws.com/pig.png",
        "following": 3,
        "followers": 3
    }

    return (
       <>
       <Box sx={{ width: '100%', pt: 0.5, bgcolor: '#D9D9D9', color: '#000000'}}>
            <Box sx={{ ml: '5%', pt: 0.5}}>
                <Avatar  style={{ display: 'inline-block' }} alt="Profile Picture" src= {user.profile_picture}/>
                <Box sx={{ display: 'inline-flex', ml: '1%' }}>
                    <Typography> {user.username} </Typography>
                </Box>
                <div>
                    <Box sx={{ display: 'inline-block' }}>
                        <Typography> {user.followers + " Followers"} </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-block', ml: 2}}>
                        <Typography> {user.following + " Following"} </Typography>
                    </Box>
                </div>
            </Box>
        </Box>
       </>
    );
}
export default UserFollowsCard;