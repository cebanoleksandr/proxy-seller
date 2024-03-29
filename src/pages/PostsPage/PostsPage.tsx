import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/Search/Search';
import './PostsPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPosts } from '../../api/post';
import { useParams, useSearchParams } from 'react-router-dom';
import { setPostsAC } from '../../redux/postsReducer';
import { PostCard } from '../../components/PostCard/PostCard';
import { filterPosts } from '../../utils/helpers';
import { Filters } from '../../components/Filters/Filters';
import { PostContainer } from '../../components/PostContainer/PostContainer';

export const PostsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [filterOrder, setFilterOrder] = useState(order);
  const [isLoading, setISLoading] = useState(false);
  const posts = useAppSelector(state => state.posts.items);
  const filteredPosts = filterPosts(posts, { query, order });
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    setISLoading(true);
    getPosts(+id!)
      .then(res => {
        dispatch(setPostsAC(res.data));
      })
      .finally(() => {
        setISLoading(false);
      })
  }, [searchQuery, filterOrder]);

  const changeQuery = (value: string) => {
    setSearchQuery(value);
  }

  const changeOrder = (value: string) => {
    setFilterOrder(value);
  }

  const movePostCard = (dragIndex: number, hoverIndex: number) => {
    const item = filteredPosts[dragIndex];
    const newItems = [...filteredPosts];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setPostsAC(newItems));
  };

  return (
    <div className="posts">
      <Helmet>
        <title>Posts Page</title>
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
          {!filteredPosts.length && !isLoading && (
            <h1 className="text-center">There are no posts</h1>
          )}
          {filteredPosts.map((post, index) => (
            <PostContainer key={post.id} index={index} post={post} moveItem={movePostCard}>
              <PostCard key={post.id} post={post} />
            </PostContainer>
          ))}
        </div>
      </DndProvider>
    </div>
  );
}