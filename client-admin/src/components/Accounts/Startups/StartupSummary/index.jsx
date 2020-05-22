import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  
    root:
    {
        fontSize: '19px',
        lineHeight: '27px',
        letterSpacing: 0,
    },

    regularweight: 
    {
        fontWeight: 400,
    },

    smalltext:
    {
      fontFamily: 'Cabin',
      fontSize: '10px',
      letterSpacing: '0.83px',
    },

  
    
  });

export default function StartupSummary()
{
    const classes = useStyles();
    const blurb =  "The investments are made through UNICEF's Cryptofund, in open\
                     source technology solutions that benefit children and the world."
    return (
      <Typography className={classes.root}>
            <Typography variant="h1" style={{ marginBottom: '30px', marginTop: '50px' }}>3 investments</Typography>
        <Grid container className={classes.cardsection} spacing={4}>
          <Grid item xs={3}>
            <Typography variant="h2">50 ETH</Typography> 
            <Typography variant="h2" className={classes.regularweight}>18976.50 USD</Typography>
            <div className={classes.smalltext}>TOTAL ETHER INVESTED</div>        
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h2">1 BTC</Typography> 
            <Typography variant="h2" className={classes.regularweight}>964432 USD</Typography>
            <div className={classes.smalltext}>TOTAL BITCOIN INVESTED</div>   
          </Grid>
          <Grid item xs={6}>
           {blurb}
          </Grid>
                
        
        </Grid>
    </Typography>
  )   
}