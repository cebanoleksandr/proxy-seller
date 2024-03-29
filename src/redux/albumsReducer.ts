import { Album } from "../utils/types";

const SET_ALBUMS = 'SET_ALBUMS';
const TOGGLE_LIKE_ALBUMS = 'TOGGLE_LIKE_ALBUMS';
const SET_FAVORITE_ALBUMS = 'SET_FAVORITE_ALBUMS';

export const albumsState: InitialState = {
  items: [],
  favorites: []
};

type InitialState = {
  items: Album[];
  favorites: Album[];
};

const albumsReducer = (
  state = albumsState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_ALBUMS: 
      return {
        ...state,
        items: action.payload
      }
    case TOGGLE_LIKE_ALBUMS: 
      const isFavorite = state.favorites.some(f => f.id === action.payload);

      return {
        ...state,
        favorites: isFavorite 
          ? state.favorites.filter(f => f.id !== action.payload) 
          : [...state.favorites, state.items.find(p => p.id === action.payload)!]
      }
    case SET_FAVORITE_ALBUMS:
      return {
        ...state,
        favorites: action.payload
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const setAlbumsAC = (albums: Album[]): SetAlbums => {
  return {
    type: SET_ALBUMS,
    payload: albums,
  }
}

export const toggleLikeAlbumsAC = (id: number): ToggleLikeAlbums => {
  return {
    type: TOGGLE_LIKE_ALBUMS,
    payload: id
  }
}

export const setFavoriteAlbumsAC = (albums: Album[]): SetFavoriteAlbums => {
  return {
    type: SET_FAVORITE_ALBUMS,
    payload: albums
  }
}

type SetAlbums = {
  type: typeof SET_ALBUMS;
  payload: Album[];
}

type ToggleLikeAlbums = {
  type: typeof TOGGLE_LIKE_ALBUMS;
  payload: number;
}

type SetFavoriteAlbums = {
  type: typeof SET_FAVORITE_ALBUMS;
  payload: Album[];
}

type ActionTypes = SetAlbums | ToggleLikeAlbums | SetFavoriteAlbums;

export default albumsReducer;
