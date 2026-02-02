import "./index.css";
import Input from "./components/input";
import Label from "./components/label";
import { AiFillDingtalkCircle } from "react-icons/ai";
import Btn from "./components/btn";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <form className="login-div">
        <div className="logo-div">
          <AiFillDingtalkCircle className="logo-icon" size={150} />
        </div>
        <div className="input-div">
          <Label htmlFor="mail" text="Email" className="login-label" />
          <Input
            type="email"
            className="login-input mail"
            placeholder="Enter your email here..."
          />
        </div>
        <div className="input-div">
          <Label htmlFor="password" text="Password" className="login-label" />
          <Input
            type="password"
            className="login-input password"
            placeholder="Enter your password here..."
          />
        </div>
        <Link className="submit-link" to="/home">
          <Btn type="submit" className="submit-btn">
            Confirm
          </Btn>
        </Link>
      </form>
    </>
  );
}

export default App;
