import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },

    text: {
      width:'107px',
      height:'69px',
      fontFamily:'IBM Plex Sans',
      fontSize: '16px',
      fontWeight:'bold',
      fontStretch:'normal',
      fontStyle: 'normal',
      lineHeight:'1.44',
      letterSpacing:'normal',
      color:'#fff'
    },
    title: {
      textTransform:"uppercase",
      letterSpacing:'1.5px',
      fontSize:'14px',
      fontWeight:'normal'
    },
    numberOfInvestments: {
      color:'#fff'
    },
    amountOfBitcoin: {
      color: '#ffd113'
    },
    amountOfEther: {
      color: '#13e7ff'
    }
  });

export const InvestObject = () => {
    const classes = useStyles()
    const [title] = useState('Invested')
    const [numberOfInvestments] = useState(3)
    const [amountOfBitcoin] = useState(1)
    const [amountOfEther] = useState(100)
    return (
      <Grid item xs={6} sm={6} md={3} className={classes.text}>
              <span className={classes.title}>{title}</span>
              <div className={classes.numberOfInvestments}>{numberOfInvestments} investments</div>
              <div className={classes.amountOfBitcoin}>{amountOfBitcoin} bitcoin</div>
              <div className={classes.amountOfEther}>{amountOfEther} ether</div>
        </Grid>
    )
}