import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { MdHome } from "react-icons/md";
import Input from "../components/input";
import { getMyAccount } from "../api/account";
import Li from "../components/li";
import { fetchPosts } from "../api/fetchPosts";
import { createPost } from "../api/createPost";

type Account = {
  full_name: string;
  email: string;
  picture: string;
};

type PostUser = {
  username: string;
  full_name: string;
  picture: string;
};

type Post = {
  post_id: string;
  created_at: string;
  image: string | null;
  text: string;
  user: PostUser;
};

export default function HomePage() {
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account>({
    full_name: "",
    email: "",
    picture: "",
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostText, setNewPostText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        // Promise.all
        const meData: any = await getMyAccount(token);
        if (meData.status === "ok") setAccount(meData.account);

        const postsData: any = await fetchPosts(token);
        if (postsData.status === "ok") setPosts(postsData.posts);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    }

    fetchData();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token || !newPostText.trim()) return;

    try {
      const data: any = await createPost(token, newPostText);

      if (data.status === "ok") {
        const postsData: any = await fetchPosts(token);
        if (postsData.status === "ok") {
          setPosts(postsData.posts);
        }

        setNewPostText("");
      }
    } catch (err) {
      console.error("Failed to create post", err);
    }
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
        <form className="new-post-form" onSubmit={handleCreatePost}>
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
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </div>
          <div className="post-btn-div">
            <Btn type="submit" className="new-post-btn">
              New Post
            </Btn>
          </div>
        </form>
        <ul className="posts-ul">
          {posts.map((post) => (
            <Li key={post.post_id} post={post} />
          ))}
        </ul>
      </div>
      <div className="logOut-div">
        <Btn className="logOut-btn" onClick={handleLogout}>
          Log out
        </Btn>
      </div>
    </section>
  );
}
