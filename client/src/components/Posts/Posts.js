import React from 'react';
import { Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return (
    <div style={{ position: "absolute", top: "50%", right: "50%", color: "gray" }}>
    <CloudOffIcon style={{ fontSize: "90px", position: "absolute", bottom: "110%", right: "45%"}}/>
    <Typography align="center" variant="h4">No results found for your search...</Typography>
    <Typography align="left" variant="subtitle1">Suggestions:</Typography>
      <ul align="left">
        <li>Make sure your words are spelled correctly.</li>
        <li>Make sure their were no commas or spaces between your hastags</li>
        <li>Try using different keywords that match the posts.</li>
      </ul>
    </div>
  )

  return (
    isLoading ? <Button><CircularProgress />&nbsp; &nbsp; May take a while. Loading posts please wait...</Button> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;