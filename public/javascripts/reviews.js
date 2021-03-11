document.addEventListener('DOMContentLoaded', async (e) => {
  const reviewForm = document.getElementById('reviewForm');
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(reviewForm);
    const gameId = formData.get('gameId');
    const review = formData.get('userReview');
    try {
      const res = await fetch(`/api/games/${gameId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userReview: review })
      });
      if (res.ok) {
        // Display review on the page
        console.log('Review successfully submitted');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  });

  const reviewEdit = document.getElementById('review-edit')
  const reviewDelete = document.getElementById('review-delete')
  const gameId = document.getElementById('reviewForm__gameId').value

  reviewEdit.addEventListener('click', async e => {
    const reviewId = reviewEdit.classList[0]

  })

  reviewDelete.addEventListener('click', async e => {
    const reviewId = reviewDelete.previousSibling.previousSibling.value
    try {
      const res = await fetch(`/api/games/${gameId}/reviews/${reviewId}`, { method: 'DELETE'})
      if (res.ok) {
        const reviewDiv = reviewDelete.parentNode
        reviewDiv.parentNode.removeChild(reviewDiv)

      } else {
        window.alert('Comment could not be deleted')
      }
    } catch (e) {
      console.log(e)
    }
  })

});
