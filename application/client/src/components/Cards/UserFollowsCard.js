import * as React from 'react';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';




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
        <Card>
        <Avatar alt="Profile Picture" src= {user.profile_picture}/>
        <div>
        <Chip label={user.followers + " Followers"} variant="outlined" />
        <Chip label={user.following + " Following"} variant="outlined"/>
        </div>
        </Card>
       </>
    );
}
export default UserFollowsCard;