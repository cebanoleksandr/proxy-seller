import { User } from "../utils/types";

const SET_USERS = 'SET_USERS';

export const usersState: InitialState = {
  items: []
};

type InitialState = {
  items: User[];
};

const usersReducer = (
  state = usersState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_USERS: 
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
export const setUsersAC = (users: User[]): SetUsers => {
  return {
    type: SET_USERS,
    payload: users,
  }
}

type SetUsers = {
  type: typeof SET_USERS;
  payload: User[];
}

type ActionTypes = SetUsers;

export default usersReducer;
