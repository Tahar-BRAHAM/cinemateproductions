import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/CINEMATE-LOGO.png";
import "../styles/Register.css";

const Register = ({ setAuthToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError("Registration failed. Please try again.");
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
              <h2>REGISTER</h2>
            </div>
            <div className="row">
              {error && <p className="error">{error}</p>}
              <form className="form-group" onSubmit={handleRegister}>
                <div className="row">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form__input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                  <input type="submit" value="Register" className="btn" />
                </div>
              </form>
            </div>
            <div className="row">
              <p>
                Already have an account?{" "}
                <Link to="/admin/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
