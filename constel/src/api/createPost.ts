const API_URL = "https://api.hr.constel.co/api/v1";

export async function createPost(token: string, text: string) {
  const formData = new FormData();
  formData.append("text", text);

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}
