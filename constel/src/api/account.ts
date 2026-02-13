const API_URL = "https://api.hr.constel.co/api/v1";

export async function getMyAccount(token: string) {
  const res = await fetch(`${API_URL}/accounts/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
