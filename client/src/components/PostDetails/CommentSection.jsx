import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';

import useStyles from './Styles';
import { commentPost } from '../../actions/posts';

function CommentSection({ post }) {

    const classes = useStyles();
    const commentsRef = useRef();
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async() => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);
        // scroll to new comment
        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'><strong>Comments</strong></Typography>
                    {comments.map((comment, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <i><strong>- {comment.split(': ')[0]}</strong></i> : {comment.split(':')[1]}
                        </Typography>
                    ))}
                    {/*Scroll to New Comment */}
                    <div ref={commentsRef} />
                </div>

                {user?.result?.name && (
                    <div style={{width:'70%'}}>
                        <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                        <TextField fullWidth rows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant='contained' onClick={handleClick} color='primary'>
                            Leave Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection