// Rich Metadata Types for Flyx

export interface IMDBData {
  rating: number;
  votes: string;
  metascore: number;
  popularity: number;
  awards: string;
  ranked: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  verified: boolean;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  avatar: string;
  role: 'actor' | 'director' | 'writer' | 'producer';
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  synopsis: string;
  runtime: string;
  airDate: string;
  rating: number;
  stillImage: string;
}

export interface Season {
  id: string;
  number: number;
  title: string;
  episodeCount: number;
  year: number;
  synopsis: string;
  poster: string;
  episodes: Episode[];
}

export interface StreamSource {
  id: string;
  name: string;
  quality: '4K' | '1080p' | '720p' | '480p';
  size: string;
  type: 'torrent' | 'direct' | 'debrid';
  seeds?: number;
  peers?: number;
  language: string;
  subtitles: string[];
}

export interface Movie {
  id: string;
  imdbId: string;
  title: string;
  originalTitle?: string;
  tagline: string;
  year: number;
  runtime: string;
  released: string;
  rated: string;
  
  // Rich metadata
  synopsis: string;
  plot: string;
  genres: string[];
  keywords: string[];
  
  // IMDB Data
  imdb: IMDBData;
  
  // Media
  poster: string;
  backdrop: string;
  logo?: string;
  trailer?: string;
  
  // Cast & Crew
  cast: CastMember[];
  directors: string[];
  writers: string[];
  producers: string[];
  
  // Technical
  languages: string[];
  countries: string[];
  budget?: string;
  boxOffice?: string;
  production?: string;
  
  // Reviews
  reviews: Review[];
  reviewCount: number;
  
  // Streams
  streams: StreamSource[];
  
  type: 'movie';
}

export interface TVShow {
  id: string;
  imdbId: string;
  title: string;
  originalTitle?: string;
  tagline: string;
  year: number;
  yearEnd?: number;
  status: 'ongoing' | 'ended' | 'canceled';
  
  // Rich metadata
  synopsis: string;
  plot: string;
  genres: string[];
  keywords: string[];
  
  // IMDB Data
  imdb: IMDBData;
  
  // Media
  poster: string;
  backdrop: string;
  logo?: string;
  trailer?: string;
  
  // Cast & Crew
  cast: CastMember[];
  creators: string[];
  
  // Seasons
  seasons: Season[];
  seasonCount: number;
  episodeCount: number;
  
  // Technical
  languages: string[];
  countries: string[];
  network: string;
  
  // Reviews
  reviews: Review[];
  reviewCount: number;
  
  type: 'tv';
}

export interface IPTVChannel {
  id: string;
  name: string;
  tvgId?: string;
  tvgName?: string;
  tvgLogo?: string;
  group: string;
  country: string;
  language: string;
  url: string;
  epgData?: {
    current?: {
      title: string;
      start: string;
      end: string;
      description: string;
    };
    upcoming?: {
      title: string;
      start: string;
      end: string;
    }[];
  };
}

export interface IPTVPlaylist {
  id: string;
  name: string;
  type: 'm3u' | 'xtreme';
  url?: string;
  serverUrl?: string;
  username?: string;
  password?: string;
  channels: IPTVChannel[];
  isActive: boolean;
  lastUpdated?: string;
}

export interface StremioAddon {
  id: string;
  name: string;
  description: string;
  version: string;
  logo?: string;
  manifestUrl: string;
  isInstalled: boolean;
  isEnabled: boolean;
  types: ('movie' | 'series' | 'channel' | 'tv')[];
}

export interface WatchlistItem {
  id: string;
  contentId: string;
  type: 'movie' | 'tv';
  addedAt: string;
}

export interface ContinueWatching {
  id: string;
  contentId: string;
  title: string;
  poster: string;
  progress: number;
  duration: number;
  currentTime: number;
  episodeTitle?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  type: 'movie' | 'tv';
  lastWatched: string;
}

export type ContentType = 'movie' | 'tv' | 'channel';
