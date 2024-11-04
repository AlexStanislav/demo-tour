import "./StarRating.css";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating">
      {[...Array(rating)].map((_, i) => (
        <i key={`star-fill-${i}`} className="pi pi-star-fill"></i>
      ))}
      {[...Array(5 - rating)].map((_, index) => (
        <i key={`star-${index + rating}`} className="pi pi-star"></i>
      ))}
    </div>
  );
}

export default StarRating;
