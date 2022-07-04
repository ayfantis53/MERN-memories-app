import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon  from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';

import useStyles from './Styles';
import { deletePosts, likePosts } from '../../../actions/posts';


function Post({ post, setCurrentId }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem('profile'));
  const backup = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === (userId));

  const openPosts = () => {
    navigate(`/posts/${post._id}`)
  };

  const handleLike = async () => {
    dispatch(likePosts(post._id));

    if(hasLikedPost){
      setLikes(post.likes.filter((id) => id !== userId));
    }
    else{
      setLikes([ ...post.likes, userId]);
    }
  };

   // The <Likes /> Component
   const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
    
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile || backup} title={post.title} onClick={openPosts} style={{cursor: 'pointer'}}/>
        
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      { ((user?.result?.googleId === post?.creator) || (user?.result?._id === post?.creator)) && (
        <div className={classes.overlay2} name="edit">
          <Button style={{color:'white'}} size='small' onClick={() => {setCurrentId(post._id);}}>
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>` #${tag}`)}</Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={ handleLike }>
          <Likes />
        </Button>

        {( (user?.result?.googleId === post?.creator) || (user?.result?._id === post?.creator)) && (
          <Button size="small" color="secondary" onClick={ () => {dispatch(deletePosts(post._id, navigate))} }>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
    )
}

export default Post
