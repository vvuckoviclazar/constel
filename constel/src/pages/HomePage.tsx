import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { MdHome } from "react-icons/md";
import Input from "../components/input";
import { getMyAccount } from "../api/account";

type Account = {
  full_name: string;
  email: string;
  picture: string;
};

export default function HomePage() {
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account>({
    full_name: "",
    email: "",
    picture: "",
  });

  useEffect(() => {
    async function fetchMe() {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      if (token && account["full_name"]) return;

      try {
        const data: any = await getMyAccount(token);

        if (data.status === "ok") {
          setAccount(data.account);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    }

    fetchMe();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
  }

  return (
    <section className="home">
      <div className="appLogo-div">
        <AiFillDingtalkCircle className="logo-icon home-logo" size={50} />
        <div className="home-h3-div">
          <MdHome className="house" size={30} />
          <h3 className="home-h3">Home</h3>
        </div>
      </div>
      <div className="posts-div">
        <form className="new-post-form">
          <div className="input-picture-div">
            <img
              src={account.picture}
              alt="User profile"
              className="profile-picture2"
            />
            <Input
              type="text"
              className="post-input"
              placeholder="What's happening?"
            />
          </div>
          <div className="post-btn-div">
            <Btn type="submit" className="new-post-btn">
              New Post
            </Btn>
          </div>
        </form>
      </div>
      <div className="logOut-div">
        <img
          src={account.picture}
          alt="User profile"
          className="profile-picture"
        />

        <Btn className="logOut-btn" onClick={handleLogout}>
          Log Out
        </Btn>
      </div>
    </section>
  );
}
