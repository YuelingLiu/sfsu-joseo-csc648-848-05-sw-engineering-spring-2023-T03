import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ProfileCard({ showDetails, userName }) {
    // for same user checking 
    const [sameUser, setSameUser] = useState(false)
    let userID = localStorage.getItem('userId');
    // get current user page from URL 
    let splitURL = window.location.href.split('/');
    let currentUser = splitURL[splitURL.length - 1]

    useEffect(() => {
        // if the userName is the same set same user to true
        if (userName === currentUser) {
            setSameUser(true);
        }
    }, [userName, currentUser]); // Update sameUser only when userName or currentUser change
    


    return (
        <>
            <Card sx={{ width: 320, marginLeft: 2.5 }}>
                <CardHeader />
                <Avatar
                    alt={userName.toUpperCase()}
                    src="user.ico"
                    sx={{ width: 180, height: 180, margin: '0 auto' }}
                />
                <CardContent>
                    <Typography variant="h5" style={{ textAlign: 'center', margin: '10px 0' }}>{userName}</Typography>
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
                                            <Button variant="contained">Follow</Button>
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