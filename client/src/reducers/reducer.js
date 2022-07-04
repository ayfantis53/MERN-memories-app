import { combineReducers } from "redux";

import posts from './posts.reducers';
import auth from "./auth.reducers";


export default combineReducers({ posts: posts, auth: auth });