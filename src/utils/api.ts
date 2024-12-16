import { API_CONFIG } from './constants';
import { handleError, createError } from './error';

const { BASE_URL, TIMEOUT } = API_CONFIG;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchWithTimeout(url: string, options: FetchOptions = {}) {
  const { timeout = TIMEOUT, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });
    clearTimeout(id);

    if (!response.ok) {
      throw createError(
        'API_ERROR',
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return response;
  } catch (error) {
    clearTimeout(id);
    throw handleError(error);
  }
}

export async function get<T>(url: string, options?: FetchOptions): Promise<T> {
  const response = await fetchWithTimeout(url, {
    ...options,
    method: 'GET',
  });
  return response.json();
}

export async function post<T>(url: string, data: any, options?: FetchOptions): Promise<T> {
  const response = await fetchWithTimeout(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}