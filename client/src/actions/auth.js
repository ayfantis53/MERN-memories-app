import * as api from '../api/index.js';

//action creators
// @desc        signIn
// @route       POST /user/signin
// @api.index   signIn
export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data});

        navigate('/');
    } 
    catch(error){
        console.log(error);
    }
};

// @desc        signUp
// @route       POST /user/signup
// @api.index   signUp
export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data});

        navigate('/');
    } 
    catch(error){
        console.log(error);
    }
};