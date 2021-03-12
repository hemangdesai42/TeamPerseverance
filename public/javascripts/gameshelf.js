async function addToShelf(category, gameId) {
  try {
    const res = await fetch(`/games/${gameId}/gameshelf/${category}`,
    {
      method: 'POST',
    });
    window.location = `/games/${gameId}`
  } catch (error) {
    console.log(error);
  }
}

async function removeFromShelf(gameId) {
  try {
    const res = await fetch(`/games/${gameId}/gameshelf`,
    {
      method: 'DELETE',
    });
    window.location = `/games/${gameId}`
  } catch (error) {
    console.log(error);
  }
}

async function moveToShelf(category, gameId) {
  try {
    const res = await fetch(`/games/${gameId}/gameshelf/${category}`,
    {
      method: 'PUT',
    });
    window.location = `/games/${gameId}`
  } catch (error) {
    console.log(error);
  }
}

const gameshelfOptions = document.querySelector(".gameShelf__dropDown-content");
gameshelfOptions.addEventListener('click', async e => {
  const gameShelf = e.target;
  const shelfId = gameShelf.id;
  const shelfArr = shelfId.split('-');
  const gameId = document.getElementById('reviewForm__gameId').value;
  let category;
  if (shelfArr[1] === 'played') {
    category = 'Played';
  } else if (shelfArr[1] === 'playing') {
    category = 'Playing';
  } else {
    category = 'Wishlist';
  }
  if (shelfArr[0] === 'add') {
    addToShelf(category, gameId);
  } else if (shelfArr[0] === 'remove') {
    removeFromShelf(gameId);
  } else if (shelfArr[0] === 'move') {
    moveToShelf(category, gameId);
  } else {
    window.alert('STOP MESSING WITH OUR HTML');
  }
});
