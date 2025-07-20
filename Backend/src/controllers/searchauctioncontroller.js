import { Auction } from "../models/Auction.model.js";


export const  searchauction=async (req,res) => {
    try {
        const {query}=req.query;
        const auctions = await Auction.find({ item: { $regex: query, $options: 'i' } });
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({error:"failed to fetch auction"});
    }
}