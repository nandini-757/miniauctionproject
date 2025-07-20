import {Auction} from "../models/Auction.model.js";

export const closeauction = async (req,res) => {
    try {
        const {id}=req.params;
        const auction =await Auction.findById(id);
        if(!auction){
            return res.status(400).json({error:"Auction not found"});
        }
        auction.closed=true;
        await auction.save();
        res.status(200).json({message:"Auction closed successfully",auction});   
    } catch (error) {
        res.status(500).json({error:"Failed to close auction"});
    }
}

