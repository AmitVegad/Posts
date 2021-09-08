import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Item from './Item';

const useStyles = makeStyles({
  dialogPaper:{
      width:450
  },
  root:{
    width:450,
    height:400,
    position:'relative'
  }
});

function ViewPost(props) {
    const classes = useStyles();
    const { onclose, view, open } = props;
  
    const handleClose = () => {
        onclose();
    };

  
    return (
      <Dialog classes={{ paper : classes.dialogPaper}} onClose={handleClose}  open={open}>
          <Item item ={view} makeStyles={useStyles}/>
      </Dialog>
    );
  }

export default ViewPost;