import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/CINEMATE-LOGO.png";
import "../styles/Login.css"; // Make sure this file includes the provided CSS

const Login = ({ setAuthToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.token;
      console.log(token);
      setAuthToken(token);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo"></span>
          <img src={logo} alt="logo" />
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form">
          <div className="container-fluid">
            <div className="row">
              <h2>LOG IN</h2>
            </div>
            <div className="row">
              {error && <p className="error">{error}</p>}
              <form className="form-group" onSubmit={handleLogin}>
                <div className="row">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form__input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className=""
                  />
                  <label htmlFor="remember_me">Remember Me!</label>
                </div>
                <div className="row">
                  <input type="submit" value="Submit" className="btn" />
                </div>
              </form>
            </div>
            <div className="row">
              <p>
                Don't have an account?{" "}
                <Link to="/admin/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
