import { get } from '../../utils/api';
import { API_CONFIG } from '../../utils/constants';
import { handleError, createError } from '../../utils/error';
import type { Anime } from '../../types';

const { BASE_URL, RATE_LIMIT_DELAY } = API_CONFIG;

interface JikanResponse<T> {
  data: T;
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRateLimit<T>(url: string): Promise<T> {
  await delay(RATE_LIMIT_DELAY);
  try {
    const response = await get<T>(url);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getTopAnime(page = 1): Promise<Anime[]> {
  try {
    const response = await fetchWithRateLimit<JikanResponse<any[]>>(
      `${BASE_URL}/top/anime?page=${page}`
    );
    
    if (!response.data) {
      throw createError('API_ERROR', 'Invalid API response format');
    }
    
    return response.data.map(formatAnimeResponse);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
}

export async function getSeasonalAnime(page = 1): Promise<Anime[]> {
  try {
    const response = await fetchWithRateLimit<JikanResponse<any[]>>(
      `${BASE_URL}/seasons/now?page=${page}`
    );
    
    if (!response.data) {
      throw createError('API_ERROR', 'Invalid API response format');
    }
    
    return response.data.map(formatAnimeResponse);
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    throw error;
  }
}

function formatAnimeResponse(data: any): Anime {
  return {
    id: data.mal_id.toString(),
    title: data.title,
    coverImage: data.images?.jpg?.large_image_url || '',
    genres: data.genres?.map((g: any) => g.name) || [],
    rating: data.score || 0,
    year: data.aired?.from ? new Date(data.aired.from).getFullYear() : new Date().getFullYear(),
    status: data.status === 'Currently Airing' ? 'ongoing' : 'completed',
    synopsis: data.synopsis || '',
  };
}