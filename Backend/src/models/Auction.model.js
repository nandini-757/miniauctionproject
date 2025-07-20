import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const AuctionSchema = new mongoose.Schema({
    item: { type: String, required: true },
  currentBid: { type: Number, required: true },
  closed: { type: Boolean, default: false },
});



export const Auction = mongoose.model('Auction', AuctionSchema);