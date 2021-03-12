const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', async e => {
    let string = e.target.value;
    console.log(string)
    const gameArr = await loadGames();
    const searchedGame = gameArr.filter(game => {
        game.includes(string)}
        );
})

async function loadGames () {
    try {
        const res = await fetch('/games')
        const resJson = await res.json();
        return resJson.games.map(game => game.name);
    } catch (error) {
        console.log(error);
    }
}
