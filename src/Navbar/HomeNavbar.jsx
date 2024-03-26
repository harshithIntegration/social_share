import React from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Box } from '@mui/material'

import Home from './Home'


const HomeNavbar = () => {
    return (
        <>
            <AppBar sx={{ bgcolor: 'white', color: 'black', height: '75px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    
                    <Typography variant="h6">
                        <img src="https://www.quantumparadigm.in/wp-content/uploads/2024/02/Quantum_Logo_With_Text.png" alt="Logo" style={{ height: 50, width: 'auto' }} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Tabs variant="standard">
                            <Tab label="Features" />
                            <Tab label="About us" />
                            <Tab label="Pricing" />
                            <Tab label="Channels" />
                        </Tabs>
                    </Box>

                    <Button sx={{
                        mr: 1, color: '#ba343b', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                        fontSize: '16px', fontWeight: '800', border: '1px solid #ba343b'
                    }}
                        variant="outlined" href='/logIn'>
                        Login
                    </Button>
                    <Button sx={{
                        mr: 1, bgcolor: '#ba343b',
                        '&:hover': { bgcolor: '#9e2b31' }, borderRadius: '25px', fontSize: '16px',
                        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
                    }}
                        variant="contained" href='/signUp'>
                        Get Started Now
                    </Button>
                  
                </Toolbar>
            </AppBar >
     <Home/>

            
        </>
    )
}

export default HomeNavbar