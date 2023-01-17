import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, ButtonBase, Typography } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom';
function Post({ post, setCurrentId}) {

  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))

  const [likes, setLikes] = useState(post?.likes)
  const userId = user?.result?._id;

  const hasLikedPost = likes.find((like) => like === userId)
  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FavoriteIcon style={{ color: 'red' }} fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FavoriteBorderIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><FavoriteBorderIcon fontSize="small" />&nbsp;Like</>;
  };
  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}`);
  };
 
  return (
    <Card className={classes.card} raised elevation={1}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
      <CardMedia className={classes.media} image={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <EditIcon fontSize="default" />
          </Button>
        </div>
      )}
        <div className={classes.details}>
          <Typography color='textSecondary' variant='body2'>{post.tags.map((tags) => `#${tags} `)}</Typography>
        </div>
        <Typography gutterBottom variant='h5' className={classes.title}>{post.title}</Typography>
        <CardContent>
        <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button size="small" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
          {(user?.result?._id === post?.creator) && (
          <Button size="small" color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
             Delete
            </Button>
          )}
        </CardActions>
    </Card>
  )
}

export default Post