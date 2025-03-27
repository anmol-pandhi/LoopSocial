export interface Group {
  id: number;
  name: string;
  description: string;
  category: string;
  members: number;
  posts: number;
  image: string;
  joined: boolean;
}

export interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  group: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  topics?: string[];
}
