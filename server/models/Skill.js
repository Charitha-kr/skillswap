const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  skillCanTeach: { type: String, required: true },
  skillWantToLearn: { type: String, required: true },
  about: String,
  createdAt: { type: Date, default: Date.now },
  contactEmail: {
    type: String,
    required: true
  }  
});

module.exports = mongoose.model('Skill', SkillSchema);
