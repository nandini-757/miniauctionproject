import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await axios.post("http://localhost:8000/api/v1/auth/signup", form);
      if (user) {
        alert("Signup Successful!");
        navigate("/signin");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.log(error);
    }

    
    // let users = JSON.parse(localStorage.getItem("users")) || [];
    // if (users.find((u) => u.username === form.username)) {
    //   alert("Username already exists!");
    //   return;
    // }

    // users.push(form);
    // localStorage.setItem("users", JSON.stringify(users));
    // alert("Signup Successful!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 "  style={{ backgroundColor: "rgb(187, 243, 255)" }}>
      <div className="card p-4 shadow-lg custom-card">
        <h2 className="text-center mb-4 text-primary fw-bold">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control custom-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
