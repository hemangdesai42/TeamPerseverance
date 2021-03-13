const searchBar = document.getElementById('searchBar');
const searchBarDiv = document.getElementsByClassName('navBar__searchBarDiv');
searchBar.addEventListener('keyup', async e => {
    let string = e.target.value.toLowerCase();
    const searchDiv = document.createElement('div');
    searchDiv.id = 'searchDiv'
    if (searchBar.firstChild) {
        searchBar.removeChild(searchDiv);
    }
    if (string.length !== 0) {
        const gameObj = await loadGames();
        const gameArr = gameObj.games
        let searchedGameArr = gameArr.filter(game => game.name.toLowerCase().includes(string))
        console.log(searchedGameArr)
        if (searchedGameArr.length !== 0) {
            searchedGameArr.forEach(game =>{
                const gameA = document.createElement('a');
                gameA.innerText = game.name;
                gameA.classList.add('searchBar__gameLink')
                gameA.href = `games/${game.id}`;
                searchDiv.appendChild(gameA);
            })
        }
    searchBarDiv[0].appendChild(searchDiv);
    }
})

async function loadGames () {
    try {
        const res = await fetch('/games')
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
