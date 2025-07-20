import React, { useEffect, useState } from "react";
import { closeAuction, getAuctions } from "../utils/DashBoardApi";

const CloseAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await getAuctions();
      if (response) {
        setAuctions(response.filter((auction) => auction.closed === false));
      }
    };

    fetchAuctions();
  }, []);

  const handleCloseAuction = async (auctionId) => {
    if (!token) {
      alert("You must be signed in to close an auction!");
      return;
    }

    const response = await closeAuction(auctionId, token);

    if (response.error) {
      alert(response.error);
    } else {
      alert("Auction closed successfully!");
      setAuctions(auctions.filter((auction) => auction._id !== auctionId));
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
        <h2 className="text-center text-white mb-4 fw-bold" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
          Close Auction
        </h2>
        {auctions.length === 0 ? (
          <p className="text-white text-center">No active auctions to close.</p>
        ) : (
          <ul className="list-group">
            {auctions.map((auction) => (
              <li
                key={auction._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "rgb(30, 30, 30)",
                  color: "white",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>{auction.item}</strong>
                  <p className="mb-0">Current Bid: ${auction.currentBid}</p>
                </div>
                <button
                  onClick={() => handleCloseAuction(auction._id)}
                  className="btn fw-bold"
                  style={{
                    backgroundColor: "#2b6777",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                >
                  Close 🛑
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CloseAuction;
