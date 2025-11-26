import "./loadingSkeleton.css";

export default function LoadingSkeleton() {
  const skeletonArr = Array(12).fill(0);

  return (
    <div className="Properties">
      <div className="search-filter">
        <div className="skeleton sk-search-bar"></div>
      </div>

      <div className="propertiesGrid">
        {skeletonArr.map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton sk-image"></div>

            <div className="sk-title">
              <div className="skeleton sk-title"></div>
              <div className="skeleton sk-rating"></div>
            </div>
            <div className="skeleton sk-line sk-desc"></div>
            <div className="skeleton sk-line sk-desc"></div>
            <div className="skeleton sk-line sk-price"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
