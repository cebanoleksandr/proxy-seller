import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/Search/Search';
import './FavoritePostsPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PostCard } from '../../components/PostCard/PostCard';
import { useSearchParams } from 'react-router-dom';
import { filterPosts } from '../../utils/helpers';
import { Filters } from '../../components/Filters/Filters';
import { setFavoritePostsAC } from '../../redux/postsReducer';
import { PostContainer } from '../../components/PostContainer/PostContainer';

export const FavoritePostsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrder, setFilterOrder] = useState(order);
  const favoritePosts = useAppSelector(state => state.posts.favorites);
  const filteredFavoritePosts = filterPosts(favoritePosts, { query, order });
  const dispatch = useAppDispatch();

  const changeQuery = (value: string) => {
    setSearchQuery(value);
  }

  const changeOrder = (value: string) => {
    setFilterOrder(value);
  }

  const movePostCard = (dragIndex: number, hoverIndex: number) => {
    const item = filteredFavoritePosts[dragIndex];
    const newItems = [...filteredFavoritePosts];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setFavoritePostsAC(newItems));
  };

  return (
    <div className="favorite-posts">
      <Helmet>
        <title>Favorite posts</title>
      </Helmet>

      <div className="filters-container">
        <div className="search-filter">
          <Search
            searchQuery={searchQuery}
            changeQuery={changeQuery}
            placeholder="Search posts..."
          />
        </div>

        <div className="filters">
          <Filters changeQuery={changeQuery} changeOrder={changeOrder} />
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div>
          {!filteredFavoritePosts.length && (
            <h1 className="text-center">There are no posts</h1>
          )}
          {filteredFavoritePosts.map((post, index) => (
            <PostContainer key={post.id} index={index} post={post} moveItem={movePostCard}>
              <PostCard post={post} />
            </PostContainer>
          ))}
        </div>
      </DndProvider>
    </div>
  );
}
