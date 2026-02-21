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

export default function Li({ post }: { post: Post }) {
  return (
    <li className="post">
      <div className="post-header">
        <div className="info-image-div">
          <img
            src={post.user.picture}
            alt="User profile"
            className="profile-picture3"
          />

          <div className="post-user">
            <p className="post-username">@{post.user.username}</p>
            <p className="post-fullname">{post.user.full_name}</p>
          </div>
        </div>
        <p className="post-date">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>

      {post.image && (
        <img src={post.image} alt="Post image" className="post-image" />
      )}

      <p className="post-text">{post.text}</p>
    </li>
  );
}
