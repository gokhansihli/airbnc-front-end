import HeartIcon from "../../icons/HeartIcon";

export default function Heart({ isFavorited, setIsFavorited }) {
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Call your endpoint here to update backend
    // e.g. toggleFavoriteAPI(property.id, !isFavorited);
  };
  return (
    <button
      className="favorite-btn"
      onClick={toggleFavorite}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon isFavorited={isFavorited} />
    </button>
  );
}
