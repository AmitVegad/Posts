import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import data from "../data";
import ViewPost from './ViewPost';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(8),
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(8),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const [post, setPost] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [sortby,setSortBy] = useState("");

  const classes = useStyles();

  useEffect(() => {
    axios.get(data[page - 1]).then((response) => {
      setPost(response.data.posts);
    });
    setCount(data.length);
  }, [page]);

  const pageHandler = (e, value) => {
    setPage(value);
  };

  const viewitem = (e,i)=>{
      setOpen(true);
      setView(post[i]);
  }

  const handleClose = () =>{
      setOpen(false);
  }

  const sort = (sortby) =>{
      console.log(sortby);
      let sortpost = [];
        if(sortby === 'like')
             sortpost = post.sort((a, b) => b.likes - a.likes);
        
        if(sortby === 'view')
             sortpost = post.sort((a, b) => b.views - a.views);
        
        if(sortby === 'share')
             sortpost = post.sort((a, b) => b.shares - a.shares);
        
        if(sortby === 'date')
             sortpost = post.sort((a, b) => b.event_date - a.event_date);
        
        setPost(sortpost);
  }
  const handleChange = (e) =>{
    setSortBy(e.target.value);
    sort(e.target.value);
  }

  return (
    <>
        <div className="navbar">
            <h3 className="navbar-heading">Posts</h3>
            <div className="navbar-drop">
                <FormControl variant="outlined" className={classes.formControl} size="small">
                    <InputLabel htmlFor="outlined-age-native-simple">Sort</InputLabel>
                    <Select
                    native
                    value={sortby}
                    onChange={handleChange}
                    label="Sort"
                    >
                    <option aria-label="None" value="" />
                    <option value={"date"}>Date</option>
                    <option value={"like"}>Like</option>
                    <option value={"share"}>Share</option>
                    <option value={"view"}>View</option>
                    </Select>
                </FormControl>
            </div>
        </div>
        {post ? (<>
                <div className="home-main">
                    {post &&
                    post.map((item,i) => {
                        return (
                        <>
                            <div key={Math.random()} className="item" onClick={(e)=>{viewitem(e,i)}}>
                            <Item item={item} />
                            </div>
                        </>
                        );
                    })}
                </div>
                <div className={classes.root}>
                    <Pagination
                    count={count}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={pageHandler}
                    />
                </div>
                <ViewPost open={open} view={view} onclose={handleClose}/>
            </>) 
            : 
            (<h1 className="home-nopost">No post right now, come back later.</h1>)
        }
    </>
  );
};

export default Home;
