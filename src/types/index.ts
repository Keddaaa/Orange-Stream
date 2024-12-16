export interface Anime {
  id: string;
  title: string;
  coverImage: string;
  genres: string[];
  rating: number;
  year: number;
  status: 'ongoing' | 'completed';
  synopsis: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: number;
  synopsis: string;
  airDate: string;
}

export interface Comment {
  id: string;
  userId: string;
  episodeId: string;
  content: string;
  createdAt: string;
  likes: number;
}