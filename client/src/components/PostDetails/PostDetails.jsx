import { Typography, Paper, CircularProgress, Divider } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import moment from 'moment';

import UseStyles from './Styles';
import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from '../../actions/posts';

function PostDetails() {

  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = UseStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if(post){
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post, dispatch])

  if(!post){
    return null;
  }

  if(isLoading){
    return(
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em'/>
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id}) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: <i>{post.name}</i></Typography>
          <Typography variant="body1"> - {moment(post.createdAt).fromNow()}</Typography>

          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>

        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>

          <Divider />

          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '10px', cursor: 'pointer', borderStyle:'groove', borderRadius:'15px', padding: '10px'}} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2"><i>{name}</i></Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1"><strong>Likes:</strong> {likes.length}</Typography>
                <img src={selectedFile} alt='memory.png' width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails