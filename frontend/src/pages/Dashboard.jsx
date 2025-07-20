import React, { useEffect, useState } from "react";
import { getAuctions,placeBid } from "../utils/DashBoardApi.js";
const AuctionDashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAuctions();
      if (data) {
        setAuctions(data);
        localStorage.setItem("auctions", JSON.stringify(data));
      }
    };
    fetchData();
  }, []);

  const handlePlaceBid = async (id) => {
    console.log(token);
    if (!token) {
      alert("Please sign in to place a bid.");
      return;
    }

    let bidAmount = prompt("Enter your bid amount:");
    if (!bidAmount || isNaN(bidAmount)) return;
    console.log(id);
    const response = await placeBid(id, parseFloat(bidAmount), token);
    
   
  if (response) {
    alert("Bid placed successfully!");

    setAuctions((prevAuctions) => {
      return prevAuctions.map((auction) =>
        auction._id === response.auction._id ? response.auction : auction
      );
    });

    localStorage.setItem("auctions", JSON.stringify(response.auction));
    } else {
      alert(response.error || "Failed to place bid.");
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
          maxWidth: "900px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center text-white mb-4 fw-bold" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
          Auction Dashboard
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="🔍 Search for an item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: "10px",
            border: "none",
            padding: "10px",
            fontSize: "16px",
          }}
        />

        <div className="row">
          {auctions
            .filter((auction) => auction.item.toLowerCase().includes(search.toLowerCase()))
            .map((auction) => (
              <div key={auction.id} className="col-md-6 mb-3">
                <div
                  className="card p-3 shadow-lg rounded text-center"
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "15px",
                    cursor: auction.closed || !token ? "not-allowed" : "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <h5 className="fw-bold" style={{ color: "#333" }}>
                    {auction.item}
                  </h5>
                  <p className="text-muted">
                    Current Bid: <strong style={{ color: "#2b6777" }}>${auction.currentBid}</strong>
                  </p>
                  <button
                    className="btn fw-bold"
                    style={{
                      backgroundColor: auction.closed || !token ? "#ddd" : "#2b6777",
                      color: auction.closed || !token ? "#555" : "#fff",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      transition: "0.3s",
                    }}
                    disabled={auction.closed || !token}
                    onClick={() => !auction.closed && token && handlePlaceBid(auction._id)}
                  >
                    {auction.closed ? "Closed" : token ? "Place Bid" : "Sign in to Bid"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionDashboard;





// import React, { useEffect, useState } from "react";
// import { getAuctions,placeBid } from "../utils/DashBoardApi.js";

// const AuctionDashboard = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [search, setSearch] = useState("");
//   const token = localStorage.getItem("token");
//   // const defaultBids = [
//   //   { id: 1, item: "Laptop", currentBid: 500, closed: false },
//   //   { id: 2, item: "Smartphone", currentBid: 300, closed: false },
//   //   { id: 3, item: "Headphones", currentBid: 100, closed: false },
//   //   { id: 4, item: "Gaming Console", currentBid: 450, closed: false },
//   //   { id: 5, item: "Smart Watch", currentBid: 150, closed: false },
//   // ];

//   useEffect(() => {
//     let storedAuctions = JSON.parse(localStorage.getItem("auctions")) || [];

  
//     const mergedAuctions = [...defaultBids];

//     storedAuctions.forEach((stored) => {
//       const existingIndex = mergedAuctions.findIndex(
//         (defaultBid) => defaultBid.item === stored.item
//       );
//       if (existingIndex !== -1) {
       
//         mergedAuctions[existingIndex].currentBid = Math.max(
//           mergedAuctions[existingIndex].currentBid,
//           stored.currentBid
//         );
//       } else {
      
//         mergedAuctions.push(stored);
//       }
//     });

//     setAuctions(mergedAuctions);
//     localStorage.setItem("auctions", JSON.stringify(mergedAuctions));
//   }, []);

//   const placeBid = (id) => {
//     let bidAmount = prompt("Enter your bid amount:");
//     if (!bidAmount) return;

//     let updatedAuctions = auctions.map((auction) => {
//       if (auction.id === id && parseFloat(bidAmount) > auction.currentBid) {
//         auction.currentBid = parseFloat(bidAmount);
//       }
//       return auction;
//     });

//     localStorage.setItem("auctions", JSON.stringify(updatedAuctions));
//     setAuctions(updatedAuctions);
//     alert("Bid placed successfully!");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         background: "linear-gradient(135deg,rgb(187, 243, 255),rgb(187, 243, 255))",
//         padding: "20px",
//       }}
//     >
//       <div
//         className="card p-4 shadow-lg rounded"
//         style={{
//           width: "90%",
//           maxWidth: "900px",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           backdropFilter: "blur(10px)",
//           border: "1px solid rgba(255, 255, 255, 0.3)",
//           borderRadius: "20px",
//         }}
//       >
//         <h2 className="text-center text-white mb-4 fw-bold " style={{ backgroundColor: "rgb(0, 0, 0)" }}>Auction Dashboard</h2>

      
//         <input
//           type="text"
//           className="form-control mb-3"
//           placeholder="🔍 Search for an item..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             borderRadius: "10px",
//             border: "none",
//             padding: "10px",
//             fontSize: "16px",
//           }}
//         />

//         {/* Auction Bids */}
//         <div className="row">
//           {auctions
//             .filter((auction) =>
//               auction.item.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((auction) => (
//               <div key={auction.id} className="col-md-6 mb-3">
//                 <div
//                   className="card p-3 shadow-lg rounded text-center"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.85)",
//                     borderRadius: "15px",
//                     cursor: auction.closed ? "not-allowed" : "pointer",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.05)")
//                   }
//                   onMouseOut={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                   onClick={() => !auction.closed && placeBid(auction.id)}
//                 >
//                   <h5
//                     className="fw-bold"
//                     style={{
//                       color: "#333",
//                     }}
//                   >
//                     {auction.item}
//                   </h5>
//                   <p className="text-muted">
//                     Current Bid:{" "}
//                     <strong style={{ color: "#2b6777" }}>
//                       ${auction.currentBid}
//                     </strong>
//                   </p>
//                   <button
//                     className={`btn fw-bold`}
//                     style={{
//                       backgroundColor: auction.closed ? "#ddd" : "#2b6777",
//                       color: auction.closed ? "#555" : "#fff",
//                       borderRadius: "8px",
//                       padding: "8px 16px",
//                       transition: "0.3s",
//                     }}
//                     disabled={auction.closed}
//                   >
//                     {auction.closed ? "Closed" : "Place Bid"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuctionDashboard;




