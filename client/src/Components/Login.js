import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    token: "",
  });
  const navigate = useNavigate();
  const GenerateToken = async () => {
    if (credentials?.username === "") {
      toast.error("Please enter username");
      return;
    }
    if (credentials?.username?.length < 8) {
      toast.error("Username must be 8 characters long");
      return;
    }
    const data = await axios.post(
      `${url}generatetoken`,
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
    setCredentials((prev) => {
      return { ...prev, token: data?.data?.returnData };
    });
    toast.success(data?.data?.msg);
  };
  const Login = async () => {
    if (credentials?.username === "") {
      toast.error("Please enter username");
      return;
    }
    if (credentials?.username?.length < 8) {
      toast.error("Username must be 8 characters long");
      return;
    }
    if (credentials?.token === "") {
      toast.error("Please enter token");
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
            <div className="label">Username</div>
            <input
              type="text"
              value={credentials?.username}
              onChange={(e) => {
                setCredentials((prev) => {
                  return { ...prev, username: e.target.value };
                });
              }}
            />
          </div>
          <div className="section">
            <div className="label">Token</div>
            <input
              type="text"
              value={credentials?.token}
              onChange={(e) => {
                setCredentials((prev) => {
                  return { ...prev, token: e.target.value };
                });
              }}
            />
          </div>
          <div className="section button">
            <button type="button" onClick={Login}>
              Login
            </button>
            <button type="button" onClick={GenerateToken}>
              Generate token
            </button>
          </div>
          <div className="warning">
            <ul>
              <li>
                If you are a new user, please generate new token and keep it
                safe
              </li>
              <li>If token is lost or forgotten, please contact admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
