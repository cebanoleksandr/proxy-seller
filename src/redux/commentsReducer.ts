import { Comment } from "../utils/types";

const SET_COMMENTS = 'SET_COMMENTS';

export const commentsState: InitialState = {
  items: []
};

type InitialState = {
  items: Comment[];
};

const commentsReducer = (
  state = commentsState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_COMMENTS: 
      return {
        ...state,
        items: action.payload
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const setCommentsAC = (comments: Comment[]): SetPComments => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
}

type SetPComments = {
  type: typeof SET_COMMENTS;
  payload: Comment[];
}

type ActionTypes = SetPComments;

export default commentsReducer;
