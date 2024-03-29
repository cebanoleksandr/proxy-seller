import { User } from "../utils/types";

const SET_USER = 'SET_USER';

export const userState: InitialState = {
  item: null
};

type InitialState = {
  item: User | null;
};

const userReducer = (
  state = userState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_USER: 
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
export const setUserAC = (user: User): SetUser => {
  return {
    type: SET_USER,
    payload: user,
  }
}

type SetUser = {
  type: typeof SET_USER;
  payload: User;
}

type ActionTypes = SetUser;

export default userReducer;
