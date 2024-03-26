import React from 'react';
import { Box, Grid, Typography } from '@mui/material';


const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box height={80} />
      <Grid container style={{ margin: '10px', maxWidth: '1200px',  flex: 1 }} spacing={2}>
        <Grid item xs={12} sm={6} style={{ fontSize: '1.2rem', color: '#333' }}>
          <h1 style={{ marginBottom: '10px' }}>Social Media</h1>
          <h1 style={{ marginBottom: '20px' }}>The easiest way to manage your brands on social media</h1>
          <p style={{ marginBottom: '20px' }}>Schedule unlimited posts, monitor what matters, and create custom-reports to analyze your social media performance with Social Media.</p>
          <button style={{ backgroundColor: '#d3040c', color: '#fff', padding: '10px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize:'20px', fontWeight:'600' }}>Demo</button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '50vw' }}>
            <video autoPlay loop muted style={{ position: 'absolute', top: '0', left: '0', width: '50vw', height: '75vh' }}>
              <source src="../Assets/SocialMedia.mp4" type="video/mp4" />
            </video>
          </div>
        </Grid>
      </Grid>
      <Footer style={{ flexShrink: 0 }} />
    </div>
  );
}
  const Footer = () => {
    return (
      <Box p={2} textAlign="center" bgcolor="#D3040C">
        <Typography variant="body1" textAlign='center' color='#fff'>
          &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Typography>
      </Box> 
    );
  }



export default Home;