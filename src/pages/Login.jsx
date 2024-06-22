import Header from "../pages/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../routes.css";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nam, setNam] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://todo-backend-mv0j.onrender.com/login",
        { name, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        localStorage.setItem("userdata", JSON.stringify(res.data));
        navigate("/todos");
      }
    } catch (error) {
      console.log("hi");
      setError(true);
    }
  };
  const getData = async () => {
    const res = await axios.get("https://todo-backend-mv0j.onrender.com/data", {
      withCredentials: true,
    });
    console.log(res.data.password);
    setName(res.data.password);
  };
  return (
    <>
      <Header />
      <div id="LoginForm">
        <p id="logintext">LOGIN</p>
        <form onSubmit={handleSubmit}>
          <div className="logininput">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>

            <input
              id="password"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
          </div>
          <input id="loginbutton" type="submit" value="LOGIN" />
        </form>
        <div class="error">{error ? "invalid username or password" : null}</div>
      </div>
    </>
  );
};

export default Login;
