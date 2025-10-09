
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('pokemonName');
  const button = document.getElementById('my-button');
  const sprite = document.getElementById('pokemonSprite');

  if (!input || !button || !sprite) return;

  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchData();
    }
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    fetchData();
  });

  async function fetchData() {
    const name = input.value.trim().toLowerCase();
    if (!name) return;
    sprite.style.display = 'none';
    sprite.alt = '';
    button.disabled = true;
    button.textContent = 'Searching...';
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
      if (!res.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await res.json();
      const img = data.sprites && data.sprites.front_default;
      if (img) {
        sprite.src = img;
        sprite.alt = data.name + ' sprite';
        sprite.style.display = '';
      } else {
        sprite.style.display = 'none';
        alert('No sprite available for that Pokémon.');
      }
    } catch (err) {
      alert(err.message || 'Failed to fetch Pokémon');
    } finally {
      button.disabled = false;
      button.textContent = 'Catch em All';
    }
  }
});
function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
   const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none';
}









