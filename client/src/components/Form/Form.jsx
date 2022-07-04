import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Paper, Button } from "@mui/material";

import useStyles from './Styles';
import { createPosts, updatePosts } from '../../actions/posts';


function Form({currentId, setCurrentId}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState({ title:'', message:'', tags:'', selectedFile:'' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));


  useEffect(() => {
    if(post){
      setPostData(post);
    }
    if(!currentId){
      clear();
    }
    // Have to set the current id to 0 or cant post anything since id initializes to null
  }, [post, currentId])

  const clear = () => {
    setCurrentId(0);
    setPostData({ title:'', message:'', tags:'', selectedFile:'' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(postData.title === '' || postData.message === ''){
        toast.error('Enter in a title and message');
    }
    else{
      if(currentId === 0){
        // Gets name from local Storage that we set under profue when we log in and sets it as creator
        dispatch(createPosts({ ...postData, name: user?.result?.name }, navigate));
      }
      else{
        // Gets name from local Storage that we set under profue when we log in and sets it as creator
        dispatch(updatePosts(currentId, { ...postData, name: user?.result?.name  }));
      }   
  
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper className='classes.paper' style={{ padding: '40px 10px', margin: '5px 0'}}>
        <Typography variant="h6" align="center">
          Please Sign in to create posts and see others posts
        </Typography>
      </Paper>
    )
  }

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} action="">
          <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
          <TextField name = "title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData, title: e.target.value})}}/>
          <TextField name = "message" variant="outlined" label="Message" multiline rows={3} fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData, message: e.target.value})}}/>
          <TextField name = "tags" variant="outlined" label="Tags (comma seperated)" fullWidth value={postData.tags} onChange={(e)=>{setPostData({...postData, tags: e.target.value.split(',')})}}/>
          <div className={classes.fileInput}>
            <FileBase type="file" multiple ={false} onDone={({base64})=>setPostData({...postData, selectedFile: base64})}/>
            <div className={classes.buttonSubmit}>
              <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            </div>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </div>
        </form>
      </Paper>
      <ToastContainer />
    </>
  )
}

export default Form