import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;