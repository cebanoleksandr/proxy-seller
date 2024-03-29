import { Post } from "../utils/types";

const SET_POSTS = 'SET_POSTS';
const TOGGLE_LIKE = 'TOGGLE_LIKE';
const SET_FAVORITE_POSTS = 'SET_FAVORITE_POSTS';

export const postsState: InitialState = {
  items: [],
  favorites: []
};

type InitialState = {
  items: Post[];
  favorites: Post[];
};

const postsReducer = (
  state = postsState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_POSTS: 
      return {
        ...state,
        items: action.payload
      }
    case TOGGLE_LIKE: 
      const isFavorite = state.favorites.some(f => f.id === action.payload);

      return {
        ...state,
        favorites: isFavorite 
          ? state.favorites.filter(f => f.id !== action.payload) 
          : [...state.favorites, state.items.find(p => p.id === action.payload)!]
      }
    case SET_FAVORITE_POSTS:
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
export const setPostsAC = (posts: Post[]): SetPosts => {
  return {
    type: SET_POSTS,
    payload: posts,
  }
}

export const toggleLikeAC = (id: number): ToggleLike => {
  return {
    type: TOGGLE_LIKE,
    payload: id
  }
}

export const setFavoritePostsAC = (posts: Post[]): SetFavoritePosts => {
  return {
    type: SET_FAVORITE_POSTS,
    payload: posts
  }
}

type SetPosts = {
  type: typeof SET_POSTS;
  payload: Post[];
}

type ToggleLike = {
  type: typeof TOGGLE_LIKE;
  payload: number;
}

type SetFavoritePosts = {
  type: typeof SET_FAVORITE_POSTS,
  payload: Post[]
}

type ActionTypes = SetPosts | ToggleLike | SetFavoritePosts;

export default postsReducer;
