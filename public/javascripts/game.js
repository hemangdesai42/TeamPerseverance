const avgRatingSpan = document.getElementById('game-rating');

if (avgRatingSpan.innerText !== 'NOT RATED') {
    const ratingArr = avgRatingSpan.innerText.split(' ');
    const avgRating = parseFloat(ratingArr[2]).toFixed(1);
    avgRatingSpan.innerText = 'AVERAGE RATING: ' + avgRating;
}
