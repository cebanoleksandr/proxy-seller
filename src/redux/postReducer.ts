import { Post } from "../utils/types";

const SET_POST = 'SET_POST';

export const postState: InitialState = {
  item: null
};

type InitialState = {
  item: Post | null;
};

const postReducer = (
  state = postState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_POST: 
      return {
        ...state,
        item: action.payload
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const setPostAC = (post: Post): SetPost => {
  return {
    type: SET_POST,
    payload: post,
  }
}

type SetPost = {
  type: typeof SET_POST;
  payload: Post;
}

type ActionTypes = SetPost;

export default postReducer;
