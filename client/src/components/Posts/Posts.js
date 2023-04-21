import React from 'react';
import { Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) {
    return (
      <div style={{ color: "gray", position: "absolute", top: "50%", left: "38%", transform: "translate(-50%, -50%)" }}>
        <Typography align="center" variant="h4">No results found for your search...</Typography>
        <Typography align="left" variant="subtitle1">Suggestions:</Typography>
        <ul align="left">
          <li>Make sure your words are spelled correctly.</li>
          <li>Make sure there were no commas or spaces between your hashtags</li>
          <li>Try using different keywords that match the posts.</li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -5%)", textAlign: "center" }}>
          <CircularProgress color="primary" />
          <Typography align="center" variant="body1" color="textSecondary" style={{ color: "gray", marginTop: "10px" }}>Loading posts, please wait...</Typography>
        </div>
      )}
      {!isLoading && (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
