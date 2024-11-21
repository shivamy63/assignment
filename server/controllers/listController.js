import { List } from '../models/List.js';
import fs from 'fs/promises';
import path from 'path';

const OUTPUT_FILE = path.join('./data', 'codes.json');

export const createList = async (req, res) => {
  const { name, responseCodes } = req.body;

  try {
    const list = await List.create({
      name,
      responseCodes,
      user: req.user,
    });
    res.status(201).json({ message: 'List created', list });
  } catch (error) {
    res.status(400).json({ message: 'Error creating list', error });
  }
};

export const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user });
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching lists', error });
  }
};

export const deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'List deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting list', error });
  }
};

export const getCodesFromFile = async (req, res) => {
  const { filter } = req.query;

  try {
    // Read the data from the file
    const data = await fs.readFile(OUTPUT_FILE, 'utf-8');
    const codes = JSON.parse(data);

    // If no filter is provided, return all codes
    if (!filter) {
      return res.status(200).json({
        success: true,
        codes,
      });
    }

    // Create a regex pattern based on the filter
    const regex = new RegExp(`^${filter.replace(/x/g, '\\d')}$`);

    // Filter the codes based on the regex
    const filteredCodes = codes.filter((item) => regex.test(item.code.toString()));

    res.status(200).json({
      success: true,
      codes: filteredCodes,
    });
  } catch (error) {
    console.error('Error reading codes file:', error);
    res.status(500).json({ message: 'Error fetching codes' });
  }
};
