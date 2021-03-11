document.addEventListener('DOMContentLoaded', async (e) => {
    const ratingBtn = document.getElementById('ratingBtn');
    ratingBtn.addEventListener('click', async e => {
        const ratingSelect = document.getElementById('ratingSelect');
        const gameId = document.getElementById('reviewForm__gameId').value;
        const rating = ratingSelect.value;
        try {
            const res = await fetch(`/api/games/${gameId}/ratings`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userRating: rating})
            }
            )

            if (res.ok) {
                console.log("Rating successfully submitted!")
            } else {
                throw res;
            }
        } catch (error) {
            console.log(error)
        }
    })
})
