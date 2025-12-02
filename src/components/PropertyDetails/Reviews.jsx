import "./reviews.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { deleteReview, postReview } from "../../utils/api";
import ProfileIcon from "../../icons/ProfileIcon";
import LoginModal from "../Header/LoginModal";
import CloseButtonIcon from "../../icons/CloseButtonIcon";
import ReviewIcon from "../../icons/ReviewIcon";
import DeleteIcon from "../../icons/DeleteIcon";

export default function Reviews({ reviews, setReviews, property }) {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await postReview(
        property.property_id,
        user.id,
        rating,
        comment,
        user.token
      );

      setReviews((currReviews) => [data.review, ...currReviews]);
      setIsSubmitting(false);
      setComment("");
      setRating(5);
      setIsModalOpen(false);
    } catch (err) {
      console.log("Post review failed:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, user.token);
      setReviews((currReviews) =>
        currReviews.filter((review) => review.review_id !== reviewId)
      );
    } catch (err) {
      console.error("Delete review failed:", err);
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card">
            <div className="review-header">
              <div className="avatar-name">
                {review.guest_avatar ? (
                  <img
                    src={review.guest_avatar}
                    alt={review.guest}
                    className="guest-avatar"
                  />
                ) : (
                  <ProfileIcon />
                )}
                <div className="guest-info">
                  <div className="guest-name">{review.guest}</div>
                  <div className="time">
                    Created at {review.created_at.split("T")[0]}
                  </div>
                </div>
              </div>

              <div className="review-rating">★ {review.rating}</div>
            </div>
            <div className="review-body">
              <p className="review-comment">{review.comment}</p>
            </div>
            {user && user.id === review.guest_id && (
              <button
                className="delete-btn"
                onClick={() => handleDeleteReview(review.review_id)}
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        className="post-review"
        onClick={() => {
          if (user) {
            setIsModalOpen(true);
          } else {
            setIsLoginModal(true);
          }
        }}
      >
        <ReviewIcon />
        <div className="open-modal-btn">Post a Review</div>
      </button>

      <LoginModal isModal={isLoginModal} setIsModal={setIsLoginModal} />

      {isModalOpen && user && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-review-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseButtonIcon />
            </button>

            <form className="review-form" onSubmit={handlePostReview}>
              <h2>Write a Review for {property.property_name}</h2>
              <div className="form-review-group">
                <div className="star-rating-icons">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <span
                      key={starValue}
                      onClick={() => setRating(starValue)}
                      className={
                        starValue <= rating
                          ? "star-selected"
                          : "star-unselected"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Hello ${user.first_name}, share your experience...`}
                required
                rows={4}
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
