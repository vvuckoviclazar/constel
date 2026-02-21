const API_URL = "https://api.hr.constel.co/api/v1";

export async function fetchPosts(token: string) {
  const res = await fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
