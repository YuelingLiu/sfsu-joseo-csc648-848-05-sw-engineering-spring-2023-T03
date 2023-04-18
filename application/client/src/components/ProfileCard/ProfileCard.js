import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function ProfileCard({ showDetails }) {
    return (
        <Card sx={{ width: 320, marginLeft: 2.5 }}>
            <CardHeader />
            <Avatar
                alt="Remy Sharp"
                src="user.ico"
                sx={{ width: 180, height: 180, margin: '0 auto' }}
            />
            <CardContent>
                <Typography variant="h5" style={{ textAlign: 'center', margin: '10px 0' }}>User Name</Typography>
                {
                    showDetails ?
                        <>
                            <div className='d-flex items-center justify-content-evenly'>
                                <Typography variant="subtitle1">## Followers</Typography>
                                <Typography variant="subtitle1">## Following</Typography>
                            </div>
                            <div className='d-flex justify-content-center mt-2'>
                                <Button variant="contained">Follow</Button>
                            </div>
                        </>
                        :
                        null
                }
            </CardContent>
        </Card>
    );
}
export default ProfileCard;