import {User} from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken  from "../utils/jwtUtils.js";
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.create({ username, password });
    console.log(user);
    console.log("himawa");
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user ,token: generateToken(user._id)});
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
