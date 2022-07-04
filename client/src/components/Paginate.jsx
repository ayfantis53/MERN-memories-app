import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';

import { getPosts } from '../actions/posts';

import useStyles from './Styles';

function Paginate({ page }) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if(page){
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination 
      classes={{ ul:classes.ul }} 
      count={numberOfPages} 
      page={Number(page) || 1} 
      variant="outlined" 
      color='primary' 
      renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to ={`/posts?page=${item.page}`}/>
      )} />
  );
};

export default Paginate