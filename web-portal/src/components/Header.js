import React from 'react';
import Typography from '@mui/material/Typography';

const Header = ({ title }) => {
  return <Typography variant="h1" component="div" gutterBottom>
    {title}
</Typography>
};

export default Header;