import { Album, Post, User } from "./types";

export const getFavoritePosts = (): Post[] => {
  const posts = localStorage.getItem('favoritePosts');

  return posts ? JSON.parse(posts) : [];
};

export const getFavoriteAlbums = (): Album[] => {
  const albums = localStorage.getItem('favoriteAlbums');

  return albums ? JSON.parse(albums) : [];
};

export const filterUsers = (users: User[], { query, order }: { query: string, order: string }): User[] => {
  let filteredUsers = users;
  const normalizedQuery = query.toLowerCase().trim();

  if (!!normalizedQuery) {
    filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(normalizedQuery));
  }

  if (order === 'ASC') {
    filteredUsers = filteredUsers.sort((u1, u2) => u1.name.localeCompare(u2.name));
  }

  if (order === 'DESC') {
    filteredUsers = filteredUsers.sort((u1, u2) => u2.name.localeCompare(u1.name));
  }

  return filteredUsers;
}

export const filterPosts = (posts: Post[], { query, order }: { query: string, order: string }): Post[] => {
  let filteredPosts = posts;
  const normalizedQuery = query.toLowerCase().trim();

  if (!!normalizedQuery) {
    filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(normalizedQuery));
  }

  if (order === 'ASC') {
    filteredPosts = filteredPosts.sort((p1, p2) => p1.title.localeCompare(p2.title));
  }

  if (order === 'DESC') {
    filteredPosts = filteredPosts.sort((p1, p2) => p2.title.localeCompare(p1.title));
  }

  return filteredPosts;
}

export const filterAlbums = (albums: Album[], { query, order }: { query: string, order: string }): Album[] => {
  let filteredAlbums = albums;
  const normalizedQuery = query.toLowerCase().trim();

  if (!!normalizedQuery) {
    filteredAlbums = filteredAlbums.filter(p => p.title.toLowerCase().includes(normalizedQuery));
  }

  if (order === 'ASC') {
    filteredAlbums = filteredAlbums.sort((p1, p2) => p1.title.localeCompare(p2.title));
  }

  if (order === 'DESC') {
    filteredAlbums = filteredAlbums.sort((p1, p2) => p2.title.localeCompare(p1.title));
  }

  return filteredAlbums;
}
