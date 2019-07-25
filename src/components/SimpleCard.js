import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard({ buttonText, buttonHandler, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>{children}</CardContent>
      <CardActions>
        <Button size="small" onClick={buttonHandler}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
