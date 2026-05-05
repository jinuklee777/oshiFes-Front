const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function fetchEvents() {
  if (!API_BASE_URL) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('행사 목록을 불러오지 못했습니다.');
  }

  return response.json();
}
