import React from "react";
import axios from "axios";
export const getAuctions=async ()=>{
try {
    const token=localStorage.getItem("token");
    const auctions = await axios.get("http://localhost:8000/api/v1/auction/getauctions",
        {
            headers: {
              Authorization: `Bearer ${token}`, // Correct way to send token
            },
          }
    );
    if(auctions){
        console.log(auctions.data);
        return auctions.data;
        
    }
    else{
        return null;
    }
} catch (error) {
    console.log(error);
}

} 


export const placeBid = async (auctionId, bidAmount, token) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auction/bid/${auctionId}`, // `_id` pass cheysthunnam
        { bidAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.auction);
      return response.data;
    } catch (error) {
      console.error("Error placing bid:", error);
      return { error: "Failed to place bid" };
    }
  };


export const postauction=async (item, startingBid,token) => {
    try {
        const response =await axios.post("http://localhost:8000/api/v1/auction/create",
        { item, startingBid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        return response;
    } catch (error) {
        console.log("any error occured here")
        console.log(error);
        return null;
    }
    
}


export const closeAuction = async (auctionId, token) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auction/closeauction/${auctionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error closing auction:", error);
      return { error: "Failed to close auction" };
    }
  };