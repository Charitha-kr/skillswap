const form = document.getElementById('skill-form');
const skillList = document.getElementById('skill-list');

// === Submit new skill ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const skill = document.getElementById('skill').value;
  const description = document.getElementById('description').value;

  const newSkill = { name, skill, description };

  try {
    const res = await fetch('http://localhost:5000/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSkill)
    });

    if (res.ok) {
      form.reset();
      fetchSkills(); // refresh the list
    } else {
      console.error('Failed to submit skill');
    }
  } catch (err) {
    console.error('Error submitting skill:', err);
  }
});

// === Fetch and display skills ===
async function fetchSkills() {
    try {
      const res = await fetch('http://localhost:5000/api/skills');
      const data = await res.json();
      allSkills = data; // Save full list
      renderSkills(allSkills);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  }
  

// Initial load
fetchSkills();
document.getElementById('searchInput').addEventListener('input', filterSkills);

let allSkills = []; // Store fetched data

async function fetchSkills() {
  try {
    const res = await fetch('http://localhost:5000/api/skills');
    const data = await res.json();
    allSkills = data; // Save full list
    renderSkills(allSkills);
  } catch (err) {
    console.error('Error fetching skills:', err);
  }
}

function renderSkills(skills) {
  const skillList = document.getElementById('skill-list');
  skillList.innerHTML = '';
  skills.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name || 'Someone'}</strong> can teach <em>${item.skill || item.skillCanTeach}</em><br>${item.description || item.about}`;
    skillList.appendChild(li);
  });
}

function filterSkills(e) {
  const term = e.target.value.toLowerCase();
  const filtered = allSkills.filter(item =>
    (item.skill || item.skillCanTeach).toLowerCase().includes(term) ||
    (item.description || item.about || '').toLowerCase().includes(term)
  );
  renderSkills(filtered);
}
