import * as React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

const Comment = ({ author, date, text }) => {
  return (
    <Card>
      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Avatar>{author[0].toUpperCase()}</Avatar>
          <Typography variant="h6" style={{ marginLeft: 8 }}>
            {author}
          </Typography>
        </div>
        <Typography variant="body1" color="textSecondary">
          {text}
        </Typography>
        <Typography variant="caption" display="block" align="right">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
