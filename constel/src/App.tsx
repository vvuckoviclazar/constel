import "./index.css";
import Input from "./components/input";
import Label from "./components/label";
import { AiFillDingtalkCircle } from "react-icons/ai";
import Btn from "./components/btn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.hr.constel.co/api/v1";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.status !== "ok") {
      alert("Login failed");
      return;
    }

    localStorage.setItem("token", data.token);

    navigate("/home");
  }

  return (
    <>
      <form className="login-div" onSubmit={handleSubmit}>
        <div className="logo-div">
          <AiFillDingtalkCircle className="logo-icon" size={150} />
        </div>

        <div className="input-div">
          <Label htmlFor="mail" text="Email" className="login-label" />
          <Input
            type="email"
            className="login-input mail"
            placeholder="Enter your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-div">
          <Label htmlFor="password" text="Password" className="login-label" />
          <Input
            type="password"
            className="login-input password"
            placeholder="Enter your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Btn type="submit" className="submit-btn">
          Confirm
        </Btn>
      </form>
    </>
  );
}

export default App;
