import "./index.css";
import Input from "./components/input";
import Label from "./components/label";
import { AiFillDingtalkCircle } from "react-icons/ai";
import Btn from "./components/btn";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api/login";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const errorTimeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  function showError(message: string) {
    setErrorMsg(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data: any = await login(email, password);

      if (data.status !== "ok") {
        showError(data.error.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      showError("Upps something went wrong");
    }
  }

  return (
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
      {errorMsg && <p className="login-error">{errorMsg}</p>}
      <Btn type="submit" className="submit-btn">
        Confirm
      </Btn>
    </form>
  );
}
