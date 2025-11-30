const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// POST /api/skills
router.post("/", async (req, res) => {
  console.log('📦 Received POST request:', req.body);
  const { skillCanTeach, skillWantToLearn, about, contactEmail } = req.body;

  if (!skillCanTeach || !skillWantToLearn) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSkill = new Skill({ skillCanTeach, skillWantToLearn, about, contactEmail });
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error('❌ Error saving skill:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
});

module.exports = router;
