document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('skillForm');
  const skillList = document.getElementById('skill-list');
  const searchInput = document.getElementById('searchInput');
  console.log(" dashboard.js is running!");

  let allSkills = [];

  // === Submit new skill ===
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(" Submit event triggered!");
  
    const skillCanTeach = document.getElementById('teachSkill').value;
    const skillWantToLearn = document.getElementById('learnSkill').value;
    const about = document.getElementById('bio').value;
    const contactEmail = document.getElementById('contactEmail').value;
  
    const newSkill = {
      skillCanTeach,
      skillWantToLearn,
      about,
      contactEmail
    };
  
    console.log(" Sending:", newSkill);
  
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
  
      if (res.ok) {
        console.log(" Skill posted successfully!");
        form.reset();
        fetchSkills();
      } else {
        console.error(' Failed to submit skill');
      }
    } catch (err) {
      console.error(' Error submitting skill:', err);
    }
  });
  

  // === Fetch all skills ===
  async function fetchSkills() {
    try {
      const res = await fetch('http://localhost:5000/api/skills');
      const data = await res.json();
      allSkills = data;
      renderSkills(allSkills);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  }

  // === Render skills to the UI ===
  function renderSkills(skills) {
    skillList.innerHTML = '';

    if (skills.length === 0) {
      skillList.innerHTML = '<li>No skills found. Be the first to post!</li>';
      return;
    }

    skills.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.skillCanTeach}</strong> wants to learn <em>${item.skillWantToLearn}</em><br>
        ${item.about}<br>
         Contact: <strong>${item.contactEmail || 'Not provided'}</strong>
      `;
      skillList.appendChild(li);
    });
  }

  // === Search/filter skills ===
  function filterSkills(e) {
    const term = e.target.value.toLowerCase();
    const filtered = allSkills.filter(item =>
      (item.skillCanTeach || '').toLowerCase().includes(term) ||
      (item.skillWantToLearn || '').toLowerCase().includes(term) ||
      (item.about || '').toLowerCase().includes(term)
    );
    renderSkills(filtered);
  }

  // === Initial load ===
  fetchSkills();
  searchInput.addEventListener('input', filterSkills);

  // === Theme toggle ===
  document.getElementById("toggleTheme").addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
  });
});

