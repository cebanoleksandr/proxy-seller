import { Photo } from "../utils/types";

const SET_PHOTOS = 'SET_PHOTOS';

export const photosState: InitialState = {
  items: []
};

type InitialState = {
  items: Photo[];
};

const photosReducer = (
  state = photosState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_PHOTOS: 
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
export const setPhotosAC = (photos: Photo[]): SetPhotos => {
  return {
    type: SET_PHOTOS,
    payload: photos,
  }
}

type SetPhotos = {
  type: typeof SET_PHOTOS;
  payload: Photo[];
}

type ActionTypes = SetPhotos;

export default photosReducer;
