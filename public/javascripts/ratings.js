function updateAvgRating (avg) {
    const ratingSpan = document.getElementById('game-rating');
    const rating = parseFloat(avg).toFixed(1);
    console.log(avg);
    ratingSpan.innerText = "AVERAGE RATING: " + rating;
}

function buildEdit() {
    const dropdownContainer = document.querySelector('.rating__dropDown');
    dropdownContainer.innerHTML = '';
    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('.gameShelf__dropDown-btn');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('rating__dropDown-content');
    dropdownBtn.innerText = 'Edit Rating';
    const buttonRemove = document.createElement('button');
    buttonRemove.id = 'remove-rating';
    buttonRemove.innerText = 'Remove Rating';
    const button1 = document.createElement('button');
    button1.id = 'edit-1';
    button1.innerText = 1;
    const button2 = document.createElement('button');
    button2.id = 'edit-2';
    button2.innerText = 2;
    const button3 = document.createElement('button');
    button3.id = 'edit-3';
    button3.innerText = 3;
    const button4 = document.createElement('button');
    button4.id = 'edit-4';
    button4.innerText = 4;
    const button5 = document.createElement('button');
    button5.id = 'edit-5';
    button5.innerText = 5;
    dropdownContainer.appendChild(dropdownBtn);
    dropdownContainer.appendChild(contentContainer);
    contentContainer.appendChild(buttonRemove);
    contentContainer.appendChild(button1);
    contentContainer.appendChild(button2);
    contentContainer.appendChild(button3);
    contentContainer.appendChild(button4);
    contentContainer.appendChild(button5);
}

function buildAdd() {
    const dropdownContainer = document.querySelector('.rating__dropDown');
    dropdownContainer.innerHTML = '';
    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('.gameShelf__dropDown-btn');
    dropdownBtn.innerText = 'Add Rating';
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('rating__dropDown-content');
    const button1 = document.createElement('button');
    button1.id = 'add-1';
    button1.innerText = 1;
    const button2 = document.createElement('button');
    button2.id = 'add-2';
    button2.innerText = 2;
    const button3 = document.createElement('button');
    button3.id = 'add-3';
    button3.innerText = 3;
    const button4 = document.createElement('button');
    button4.id = 'add-4';
    button4.innerText = 4;
    const button5 = document.createElement('button');
    button5.id = 'add-5';
    button5.innerText = 5;
    dropdownContainer.appendChild(dropdownBtn);
    dropdownContainer.appendChild(contentContainer);
    contentContainer.appendChild(button1);
    contentContainer.appendChild(button2);
    contentContainer.appendChild(button3);
    contentContainer.appendChild(button4);
    contentContainer.appendChild(button5);
}

async function addRating(rating) {
    const gameId = document.getElementById('reviewForm__gameId').value;
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
            buildEdit();
            updateAvgRating(json.avg);
        } else {
            throw res;
        }
    } catch (error) {
        console.log(error)
    }
}

async function removeRating() {
    const gameId = document.getElementById('reviewForm__gameId').value;
    const ratingId = document.getElementById('user-rated-id').value;
    try {
        const res = await fetch(`/api/games/${gameId}/ratings/${ratingId}`,
        {
            method: 'DELETE',
        })
        if (res.ok) {
            const hiddenRating = document.getElementById('user-rated');
            const hiddenRatingId = document.getElementById('user-rated-id');
            const ratingDiv = hiddenRatingId.parentNode;
            ratingDiv.removeChild(hiddenRatingId);
            ratingDiv.removeChild(hiddenRating);
            buildAdd();
            const resJson = await res.json();
            if (resJson.ratings) {
                updateAvgRating(resJson.avg);
            } else {
                document.getElementById('game-rating').innerText = "NOT RATED";
            }
        } else {
            throw res;
        }
    } catch (error) {
        console.log(error);
    }
}

async function editRating(rating) {
    const gameId = document.getElementById('reviewForm__gameId').value;
    const ratingId = document.getElementById('user-rated-id').value;
    try {
        const res = await fetch(`/api/games/${gameId}/ratings/${ratingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userRating: rating })
        });
        if (res.ok) {
            const json = await res.json();
            updateAvgRating(json.avg);
        } else {
            window.alert('Unable to change your rating at this time');
            throw res;
        }
    } catch(error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async (e) => {
    const ratingButton = document.querySelector('.rating__dropDown');
    ratingButton.addEventListener('click', async e => {
        const target = e.target;
        const targetId = target.id;
        if (targetId.includes('edit')) {
            const rating = targetId.split('-')[1];
            await editRating(rating);
        } else if (targetId.includes('add')) {
            const rating = targetId.split('-')[1];
            await addRating(rating);
        } else if (targetId.includes('remove')) { // Remove rating
            await removeRating();
        }
    })
})
