export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type Geo = {
  lat: string;
  lng: string;
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  isFavorite?: boolean;
}

export type Album = {
  userId: number;
  id: number;
  title: string;
  isFavorite?: boolean;
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
