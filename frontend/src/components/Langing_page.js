import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Container maxWidth="lg"  style={{ height: '100vh' , marginTop: '40px'}} >
      <Grid container spacing={3} style={{ height: '100%' }}>
        {/* Left Container (30%) */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ height: '50%', padding: '20px' }}>
            <Typography variant="h4">What services you are looking for</Typography>
            <Typography>services availible here</Typography>
          </Paper>
        </Grid>

        {/* Right Container (60%) */}
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
            <Typography variant="h4">Images</Typography>
            <Typography>Images come here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;


