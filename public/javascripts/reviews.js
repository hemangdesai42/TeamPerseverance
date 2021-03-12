let ORIGINAL_REVIEW;

const toggleAll = () => {
  const editBtn = document.getElementById('review-edit');
  const deleteBtn = document.getElementById('review-delete');
  const cancelBtn = document.getElementById('edit-cancel');
  const submitBtn = document.getElementById('edit-submit');
  editBtn.classList.toggle('review-button-visible');
  deleteBtn.classList.toggle('review-button-visible');
  cancelBtn.classList.toggle('review-button-visible');
  submitBtn.classList.toggle('review-button-visible');
}

const attachDeleteListener = element => {
  const gameId = document.getElementById('reviewForm__gameId').value
  element.addEventListener('click', async e => {
    const reviewId = element.previousSibling.previousSibling.value
    try {
      const res = await fetch(`/api/games/${gameId}/reviews/${reviewId}`, { method: 'DELETE'})
      if (res.ok) {
        const reviewDiv = element.parentNode
        reviewDiv.parentNode.removeChild(reviewDiv)
      } else {
        window.alert('Comment could not be deleted')
      }
    } catch (e) {
      console.log(e)
    }
  })
}

const attachEditListener = element => {
  const gameId = document.getElementById('reviewForm__gameId').value
  element.addEventListener('click', e => {
    const reviewElement = element.previousSibling.previousSibling;
    const reviewText = reviewElement.innerText;
    const reviewContainer = reviewElement.parentNode;
    reviewContainer.removeChild(reviewElement);
    const textarea = document.createElement('textarea');
    textarea.value = reviewText;
    ORIGINAL_REVIEW = reviewText;
    reviewContainer.insertBefore(textarea, element.previousSibling);
    toggleAll();
  })
}

const attachCancelListener = element => {
  element.addEventListener('click', e => {
    const gameId = document.getElementById('reviewForm__gameId').value
    const reviewElement = element.previousSibling.previousSibling.previousSibling.previousSibling;
    const reviewContainer = element.parentNode;
    const inputElement = reviewElement.nextSibling;
    reviewContainer.removeChild(reviewElement);
    const reviewParagraph = document.createElement('p');
    reviewParagraph.innerText = ORIGINAL_REVIEW;
    reviewContainer.insertBefore(reviewParagraph, inputElement);
    toggleAll();
  })
}

const attachSubmitListener = element => {
  const gameId = document.getElementById('reviewForm__gameId').value
  element.addEventListener('click', async e => {
    const reviewTextarea = element.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    const reviewText = reviewTextarea.value;
    const hiddenInput = reviewTextarea.nextSibling;
    const reviewId = hiddenInput.value;
    try {
      const res = await fetch(`/api/games/${gameId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userReview: reviewText })
      });
      if (res.ok) {
        const reviewContainer = reviewTextarea.parentNode;
        reviewContainer.removeChild(reviewTextarea);
        const reviewParagraph = document.createElement('p');
        reviewParagraph.innerText = reviewText;
        reviewContainer.insertBefore(reviewParagraph, hiddenInput);
        toggleAll();
      } else {
        window.alert('Unable to submit the review change at this time');
      }
    } catch (error) {
      console.log(error);
    }
  });
}

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
        const json = await res.json();
        if (!json.submitted) {
          window.alert('You have already submitted a review.  You can find and edit your review below');
          return;
        }
        const review = json.userReview;
        document.querySelector('#reviewForm textarea').value = '';
        const reviewList = document.querySelector('.review__list');
        const reviewContainer = document.createElement('div');
        const userName = document.createElement('p');
        userName.innerText = json.userName;
        const createdAt = document.createElement('p');
        createdAt.innerText = review.createdAt;
        const reviewText = document.createElement('p');
        reviewText.innerText = review.review;
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'reviewId';
        hiddenInput.value = review.id;
        const editButton = document.createElement('button');
        editButton.id = 'review-edit';
        editButton.innerText = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.id = 'review-delete';
        deleteButton.innerText = 'Delete';
        const cancelButton = document.createElement('button');
        cancelButton.id = 'edit-cancel';
        cancelButton.innerText = 'Cancel'
        cancelButton.classList.toggle('review-button-visible');
        const submitButton = document.createElement('button');
        submitButton.id = 'edit-submit';
        submitButton.innerText = 'Submit';
        submitButton.classList.toggle('review-button-visible');
        attachCancelListener(cancelButton);
        attachSubmitListener(submitButton);
        attachEditListener(editButton);
        attachDeleteListener(deleteButton);
        reviewList.prepend(reviewContainer);
        reviewContainer.appendChild(userName);
        reviewContainer.appendChild(createdAt);
        reviewContainer.appendChild(reviewText);
        reviewContainer.appendChild(hiddenInput);
        reviewContainer.appendChild(editButton);
        reviewContainer.appendChild(deleteButton);
        reviewContainer.appendChild(cancelButton);
        reviewContainer.appendChild(submitButton);
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  });

  const reviewEdit = document.getElementById('review-edit')
  const reviewDelete = document.getElementById('review-delete')
  const reviewCancel = document.getElementById('edit-cancel');
  const reviewSubmit = document.getElementById('edit-submit');

  if (reviewEdit) {
    attachEditListener(reviewEdit);
  }

  if (reviewDelete) {
    attachDeleteListener(reviewDelete);
  }

  if (reviewCancel) {
    reviewCancel.classList.toggle('review-button-visible');
    attachCancelListener(reviewCancel);
  }

  if (reviewSubmit) {
    reviewSubmit.classList.toggle('review-button-visible');
    attachSubmitListener(reviewSubmit);
  }
});
