import React from 'react';
import Typography from '@mui/material/Typography';

const HelpText = ({ text }) => {
  return <Typography variant="subtitle2" gutterBottom component="div" sx={{ fontStyle: 'italic' }}>
    {text}
  </Typography>
}

export default HelpText;