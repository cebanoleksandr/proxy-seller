import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/Search/Search';
import './HomePage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUsers } from '../../api/user';
import { setUsersAC } from '../../redux/usersReducer';
import { UserCard } from '../../components/UserCard/UserCard';
import { Loader } from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { filterUsers } from '../../utils/helpers';
import { Filters } from '../../components/Filters/Filters';
import { UserContainer } from '../../components/UserContainer/UserContainer';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [filterOrder, setFilterOrder] = useState(order);
  const [isLoading, setIsLoading] = useState(false);
  const users = useAppSelector(state => state.users.items);
  const dispatch = useAppDispatch();
  const filteredUsers = filterUsers(users, { query, order });

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(res => {
        dispatch(setUsersAC(res.data));
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery, filterOrder]);

  const changeQuery = (value: string) => {
    setSearchQuery(value);
  }

  const changeOrder = (value: string) => {
    setFilterOrder(value);
  }

  const moveUserCard = (dragIndex: number, hoverIndex: number) => {
    const item = filteredUsers[dragIndex];
    const newItems = [...filteredUsers];

    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    dispatch(setUsersAC(newItems));
  };

  return (
    <div className="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <div className="filters-container">
        <div className="search-filter">
          <Search
            searchQuery={searchQuery}
            changeQuery={changeQuery}
            placeholder="Search user..."
          />
        </div>

        <div className="filters">
          <Filters changeQuery={changeQuery} changeOrder={changeOrder} />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
          <DndProvider backend={HTML5Backend}>
            <div className="users-container">
              {!filteredUsers.length && !isLoading && (
                <h1 className="text-center">There are no users</h1>
              )}
              {filteredUsers.map((user, index) => (
                <UserContainer key={user.id} index={index} user={user} moveItem={moveUserCard}>
                  <UserCard user={user} />
                </UserContainer>
              ))}
            </div>
          </DndProvider>
      )}
    </div>
  );
}
