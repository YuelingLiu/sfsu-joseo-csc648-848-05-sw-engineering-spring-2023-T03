import * as React from 'react';
import { Button, TextField } from '@mui/material';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = React.useState('');
  const [text, setText] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '15px'}}>
      <TextField
        label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        minRows={2}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Post comment
      </Button>
    </form>
  );
};

export default CommentForm;
