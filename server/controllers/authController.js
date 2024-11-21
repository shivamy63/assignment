import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.cookie('token', generateToken(user._id), { httpOnly: true });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie('token', generateToken(user._id), { httpOnly: true });
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error logging in', error });
  }
};
