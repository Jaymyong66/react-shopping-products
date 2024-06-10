const API_URL = import.meta.env.VITE_API_URL;

/**
 * 공통 요청을 처리하는 함수
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} options - fetch options
 * @returns {Response} - fetch response
 */
export async function makeRequest(endpoint: string, options: RequestInit): Promise<Response> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to ${options.method} ${endpoint}`);
  }

  return response;
}
