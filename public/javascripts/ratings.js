async function addRating(button) {
    button.addEventListener('click', async e => {
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
            })
            if (res.ok) {
                const json = await res.json();
                const userRating = json.userRating;
                button.classList.toggle('rating-button-visible');
                const editButton = document.getElementById('ratingEdit');
                editButton.classList.toggle('rating-button-visible');
                const hiddenRating = document.createElement('input');
                const hiddenRatingId = document.createElement('input');
                hiddenRating.type = 'hidden';
                hiddenRatingId.type = 'hidden';
                hiddenRating.value = userRating.rating;
                hiddenRatingId.value = userRating.id;
                hiddenRating.id = 'user-rated';
                hiddenRatingId.id = 'user-rated-id';
                const ratingContainer = document.querySelector('.ratingDiv');
                ratingContainer.prepend(hiddenRatingId);
                ratingContainer.prepend(hiddenRating);
                const ratingOpt = document.getElementById('opt-1');
                ratingOpt.value = 'delete';
                ratingOpt.innerText = 'Delete My Rating';
                // Calculate Average
            } else {
                throw res;
            }
        } catch (error) {
            console.log(error)
        }
    })
}

async function editRating(button, userReview) {
    const gameId = document.getElementById('reviewForm__gameId').value;
    button.addEventListener('click', async e => {
        const selectEl = document.getElementById('ratingSelect');
        const userRating = document.getElementById('user-rated').value;
        const ratingId = document.getElementById('user-rated-id').value;
        if (selectEl.value === userRating) {
            return; // No change in user rating.
        } else if (selectEl.value === 'delete') {
            try {
                const res = await fetch(`/api/games/${gameId}/ratings/${ratingId}`,
                {
                    method: 'DELETE'
                })
                if (res.ok) {
                    const hiddenRating = document.getElementById('user-rated');
                    const hiddenRatingId = document.getElementById('user-rated-id');
                    const ratingDiv = hiddenRatingId.parentNode;
                    ratingDiv.removeChild(hiddenRatingId);
                    ratingDiv.removeChild(hiddenRating);
                    const ratingOpt = document.getElementById('opt-1');
                    ratingOpt.value = null;
                    ratingOpt.innerText = 'Rating';
                    ratingOpt.selected = 'selected';
                    const ratingBtn = document.getElementById('ratingEdit');
                    const ratingEditBtn = document.getElementById('ratingEdit');
                    ratingBtn.classList.toggle('rating-button-visible');
                    ratingEditBtn.classList.toggle('rating-button-visible');
                    // Calulate Average
                } else {
                    throw res;
                }
            } catch (error) {
                console.log(error);
            }
        } else { // Change user rating
            try {
                const res = await fetch(`/api/games/${gameId}/ratings/${ratingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userRating: selectEl.value })
                });
                if (res.ok) {
                    // FIX BUG
                    // Recalculate average
                } else {
                    window.alert('Unable to change your rating at this time');
                    throw res;
                }
            } catch(error) {
                console.log(error);
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', async (e) => {
    const ratingBtn = document.getElementById('ratingBtn');
    addRating(ratingBtn);
    const ratingEditBtn = document.getElementById('ratingEdit');
    editRating(ratingEditBtn);

    const hiddenRatingInput = document.getElementById('user-rated');
    if (hiddenRatingInput) {
        const userRating = hiddenRatingInput.value;
        const ratingOption = document.getElementById('ratingSelect')
        ratingOption.value = userRating;
        ratingBtn.classList.toggle('rating-button-visible')
    } else {
        ratingEditBtn.classList.toggle('rating-button-visible');
    }
})
