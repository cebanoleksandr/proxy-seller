import { Album } from "../utils/types";

const SET_ALBUM = 'SET_ALBUM';

export const albumState: InitialState = {
  item: null
};

type InitialState = {
  item: Album | null;
};

const albumReducer = (
  state = albumState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_ALBUM: 
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
export const setAlbumAC = (album: Album): SetAlbum => {
  return {
    type: SET_ALBUM,
    payload: album,
  }
}

type SetAlbum = {
  type: typeof SET_ALBUM;
  payload: Album;
}

type ActionTypes = SetAlbum;

export default albumReducer;
