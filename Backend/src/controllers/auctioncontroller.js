import {Auction} from "../models/Auction.model.js";

export const createAuction = async (req, res) => {
  try {
    const { item, startingBid } = req.body;
    const newAuction = new Auction({ item, currentBid: startingBid });

    await newAuction.save();
    console.log(newAuction.id);
    res.status(201).json({ message: "Auction created successfully", auction: newAuction });
  } catch (error) {
    res.status(500).json({ error: "Failed to create auction" });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
};

export const placeBid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { bidAmount } = req.body;
    console.log(bidAmount);

    const auction = await Auction.findById(id);
    if (!auction || bidAmount <= auction.currentBid) {
      return res.status(400).json({ error: "Invalid bid amount" });
    }

    auction.currentBid = bidAmount;
    await auction.save();

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    console.log("enti error vastundha")
    res.status(500).json({ error: "Failed to place bid" });
  }
};
