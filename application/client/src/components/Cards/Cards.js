import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
export default function Cards({data}) {
    const {author, title, rating} = data;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://source.unsplash.com/random/400x400/?programming"
                title="green iguana"
            />
            <CardContent>
                <div className='d-flex justify-content-between align-items-center'>                    
                <Typography gutterBottom variant="h6" component="div">
                    {author}
                </Typography>
                <Button startIcon={<GradeIcon />}>
                     Ratings {rating}
                </Button>
                </div>
                <Typography variant="subtitle1">
                  {title}: the title will be placed here
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}