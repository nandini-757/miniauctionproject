import React, { useState } from "react";
import { postauction } from "../utils/DashBoardApi.js";
const PostAuction = () => {
  const [form, setForm] = useState({ item: "", startingBid: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be signed in to post an auction!");
      return;
    }

    const response = await postauction(form.item, form.startingBid, token);
    if (response) {
      alert("Auction posted successfully!");
    } else {
      alert("Failed to post auction!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg,rgb(187, 243, 255),rgb(187, 243, 255))",
        padding: "20px",
      }}
    >
      <div
        className="card p-4 shadow-lg rounded"
        style={{
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "rgb(0, 0, 0)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.93)",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center text-white mb-4 fw-bold" style={{ backgroundColor: "rgb(0, 0, 0)" }}>Post Auction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white fw-bold" style={{ textDecorationColor: "rgb(0, 0, 0)" }}>Item Name</label>
            <input
              type="text"
              name="item"
              className="form-control"
              placeholder="Enter item name..."
              value={form.item}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontSize: "16px",
                border: "none",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white fw-bold">Starting Bid ($)</label>
            <input
              type="number"
              name="startingBid"
              className="form-control"
              placeholder="Minimum $1"
              value={form.startingBid}
              onChange={handleChange}
              required
              min="1"
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontSize: "16px",
                border: "none",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#2b6777",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            Post Auction 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAuction;
