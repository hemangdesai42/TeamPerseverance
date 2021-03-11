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
});
