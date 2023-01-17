import React, { useEffect } from 'react'
import { Paper, Typography, Divider, ButtonBase } from '@material-ui/core'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import FavoriteIcon from '@material-ui/icons/Favorite';

import useStyles from './styles'

const PostDetails = () => {

  const { post, posts } = useSelector((state) => state.posts)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const backBtn = () => {navigate('/posts')}

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);  

  return (
  <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
    <ButtonBase><ArrowBackIosNewIcon onClick={backBtn}>Back</ArrowBackIosNewIcon></ButtonBase>
    <div className={classes.card}>
        <div className={classes.section}>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h4" component="h2" style={{ marginBottom: "10px", fontSize: "30px" }}>{post.title}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ maxWidth: '400px', margin: '25px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1"><FavoriteIcon fontSize='inherit' style={{ color: 'red' }}/> {likes.length}</Typography>
                <img alt="file selector" src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails