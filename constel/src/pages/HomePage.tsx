import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";

const API_URL = "https://api.hr.constel.co/api/v1";

type Account = {
  full_name: string;
  email: string;
  picture: string;
};

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [account, setAccount] = useState<Account>({
    full_name: "",
    email: "",
    picture: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function fetchMe() {
      try {
        const res = await fetch(`${API_URL}/accounts/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: any = await res.json();

        if (data.status === "ok") {
          setAccount(data.account);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    }

    fetchMe();
  }, [token, navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="home-wrapper">
      <div className="profile-div">
        <img
          src={account.picture}
          alt="User profile"
          className="profile-picture"
        />
      </div>
      <Btn className="logOut-btn" onClick={handleLogout}>
        Log Out
      </Btn>
    </div>
  );
}
