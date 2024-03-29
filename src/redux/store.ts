import { combineReducers, createStore, Store } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import albumsReducer from './albumsReducer';
import photosReducer from './photosReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import albumReducer from './albumReducer';
import commentsReducer from './commentsReducer';
const reducers = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  albums: albumsReducer,
  photos: photosReducer,
  user: userReducer,
  post: postReducer,
  album: albumReducer,
  comments: commentsReducer
});

const store: Store<RootState> = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
