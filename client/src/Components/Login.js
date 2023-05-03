import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const Register = async () => {
    if (credentials?.email === "") {
      toast.error("Please enter email");
      return;
    }
    if (credentials?.password === "") {
      toast.error("Please enter password");
      return;
    }
    const data = await axios.post(
      `${url}register`,
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data?.data?.returnCode) {
      toast.error(data?.data?.msg);
      return;
    }
    toast.success(data?.data?.msg);
    sessionStorage.setItem(
      "profiledata",
      JSON.stringify(data?.data?.returnData)
    );
    navigate("/dashboard");
  };
  const Login = async () => {
    if (credentials?.email === "") {
      toast.error("Please enter email");
      return;
    }
    if (credentials?.password === "") {
      toast.error("Please enter password");
      return;
    }
    const data = await axios.post(`${url}login`, JSON.stringify(credentials), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data?.data?.returnCode) {
      toast.error(data?.data?.msg);
      return;
    }
    sessionStorage.setItem(
      "profiledata",
      JSON.stringify(data?.data?.returnData)
    );
    navigate("/dashboard");
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="header">Login</div>
        <div className="form">
          <div className="section">
            <div className="label">E mail</div>
            <input
              type="email"
              value={credentials?.email}
              onChange={(e) => {
                setCredentials((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
          </div>
          <div className="section">
            <div className="label">Password</div>
            <input
              type="password"
              value={credentials?.password}
              onChange={(e) => {
                setCredentials((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
          </div>
          <div className="section button">
            <button type="button" onClick={Login}>
              Login
            </button>
            <button type="button" onClick={Register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
