import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./priceRange.css";

export default function PriceRange({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) {
  return (
    <div className="price-range">
      <h2>Price range</h2>
      <div className="slider-values">
        <span>${minPrice}</span> <span>${maxPrice}</span>
      </div>
      <Slider
        range={true}
        min={0}
        max={1000}
        value={[minPrice, maxPrice]}
        onChange={([min, max]) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />
    </div>
  );
}
