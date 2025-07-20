import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await axios.post("http://localhost:8000/api/v1/auth/signin",form);
      if(user){
        alert("Login Successful!");
        const token = user.data.token;
        localStorage.setItem("token",token);
        console.log(token);
        navigate("/dashboard");
      }else{
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }

    // let users = JSON.parse(localStorage.getItem("users")) || [];

    // let foundUser = users.find((u) => u.username === form.username && u.password === form.password);
    // if (foundUser) {
    //   localStorage.setItem("loggedInUser", form.username);
    //   alert("Login Successful!");
    //   navigate("/dashboard");
    // } else {
    //   alert("Invalid credentials");
    // }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "rgb(187, 243, 255)" }}>
      <div className="card shadow-lg p-4 rounded" style={{ width: "30rem", backgroundColor: "white" }}>
        <h2 className="text-center mb-4 text-primary">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input 
              type="text" 
              name="username" 
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-bold"
            style={{ transition: "0.3s" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
