import * as api from '../api/index.js';

//action creators
// @desc        getPost
// @route       POST /posts
// @api.index   fetchPost
export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.fetchPost(id);
        dispatch({ type: 'FETCH_POST', payload: { post: data }  });

        dispatch({ type: 'END_LOADING' });
    }
    catch (error){
        console.log(error.message);
    }    
}
// @desc        getPosts
// @route       POST /posts
// @api.index   fetchPosts
export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });

        dispatch({ type: 'END_LOADING' });
    }
    catch (error){
        console.log(error.message);
    }    
}

// @desc        searchPosts
// @route       GET /posts
// @api.index   fetchPostsBySearch
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });

        dispatch({ type: 'END_LOADING' });
    }
    catch (error){
        console.log(error);
    } 
} 

// @desc        createPosts
// @route       POST /posts
// @api.index   createPosts
export const createPosts = (post, navigate) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.createPosts(post);
        dispatch({ type: 'CREATE', payload: data });

        navigate(`/posts/${data._id}`);
    }
    catch (error){
        console.log(error);
    }    
}

// @desc        updatePosts
// @route       PATCH /posts/:id/
// @api.index   updatePosts
export const updatePosts = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePosts(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    }
    catch (error){
        console.log(error.message);
    }    
}

// @desc        getPosts
// @route       PATCH /posts/:id/likePost
// @api.index   likePosts
export const likePosts = (id) => async(dispatch) => {
    // const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePosts(id);
        dispatch({ type: 'LIKE', payload: data });
    }
    catch (error){
        console.log(error);
    }    
};

// @desc        commentPost
// @route       PATCH /posts/:id/likePost
// @api.index   commentPost
export const commentPost = (value, id) => async(dispatch) => {
    try {
        const { data } = await api.commentPost(value, id);
        dispatch({ type: 'COMMENT', payload: data });
        return data.comments;
    }
    catch (error){
        console.log(error);
    }    
};

// @desc        deletePosts
// @route       DELETE /posts/:id/
// @api.index   deletePosts
export const deletePosts = (id, navigate) => async(dispatch) => {
    try {
        await api.deletePosts(id);
        dispatch({ type: 'DELETE' });

        navigate('/');
    }
    catch (error){
        console.log(error.message);
    }    
}