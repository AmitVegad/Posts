import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  header:{
      textAlign: 'center',
  },
  share:{
      position:'absolute',
        right: '0'
  },
  title:{
    wordWrap: 'break-word'
  }
}));

function Item(props) {
  const classes = useStyles();
  const itemclasses = props.makeStyles ? props.makeStyles() : null;
  const { item } = props;
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);

    return t.getDate() +"/" + (t.getMonth()+1) + "/" + t.getFullYear();
}

  return (
    <Card className={itemclasses ? itemclasses.root : classes.root}>
      <CardHeader
        className={classes.header}
        title={item.event_name}
        subheader={toDateTime(item.event_date)}
      />
      <CardMedia
        className={classes.media}
        image={item.thumbnail_image}
        title={item.event_name}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon /> <h5>{item.likes}</h5>
        </IconButton>
        <IconButton aria-label="view">
          <VisibilityIcon /> <h5>{item.views}</h5>
        </IconButton>
        <IconButton aria-label="share" className={classes.share}>
          <ShareIcon /> <h5>{item.shares}</h5>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Item;