const gameshelfOptions = document.querySelector(".gameShelf__dropDown-content");
gameshelfOptions.addEventListener('click', async e => {
  const gameShelf = e.target();
  const shelfId = gameShelf.id;
  let category;
  if (shelfId === 'add-played') {
    category = 'played';
  } else if (shelfId === 'add-playing') {
    category = 'playing';
  } else if (shelfId === 'add-wishlist') {
    category = 'wishlist';
  } else {
    window.alert('STOP MESSING WITH OUR HTML');
    return;
  }
  try {
    const gameId = document.getElementById('reviewForm__gameId').value;
    const res = await fetch(`/games/${gameId}/${category}`, {
      method: 'POST'
    });
    if (res.ok) {
      // todo something
    } else {
      throw res;
    }
  } catch (error) {
    console.log(error);
  }
});
