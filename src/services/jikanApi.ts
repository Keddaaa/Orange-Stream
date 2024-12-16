import { Anime } from '../types';
import { API_CONFIG } from '../utils/constants';
import { handleError, createError } from '../utils/error';

const BASE_URL = 'https://api.jikan.moe/v4';
const RATE_LIMIT_DELAY = 1000; // 1 seconde entre chaque requête

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function searchAnime(query: string): Promise<Anime[]> {
  try {
    await delay(RATE_LIMIT_DELAY);
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`);

    if (!response.ok) {
      throw createError('API_ERROR', 'Erreur lors de la recherche');
    }

    const data = await response.json();
    return data.data.map(formatAnimeResponse);
  } catch (error) {
    console.error('Error searching anime:', error);
    throw handleError(error);
  }
}

export async function getTopAnime(): Promise<Anime[]> {
  try {
    await delay(RATE_LIMIT_DELAY);
    const response = await fetch(`${BASE_URL}/top/anime`);

    if (!response.ok) {
      throw createError('API_ERROR', 'Erreur lors de la récupération des top animes');
    }

    const data = await response.json();
    return data.data.map(formatAnimeResponse);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw handleError(error);
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