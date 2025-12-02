import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import {
  getPropertyById,
  getPropertyReviews,
  getPropertyBookings,
  getUserFavourites,
} from "../../utils/api";
import Reviews from "./Reviews.jsx";
import BookingBox from "./BookingBox.jsx";
import Calendar from "../../utils/Calendar.jsx";
import amenityIcons from "../../icons/amenityIcons.js";
import PropertyLoadingSkeleton from "./PropertyLoadingSkeleton.jsx";
import "./property.css";
import Favourite from "../Properties/Favourite.jsx";

export default function Property() {
  const [property, setProperty] = useState(null);
  const [isFavorited, setIsFavourited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.property);
      } catch (error) {
        setHasErrored(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const data = await getPropertyReviews(id);
        setReviews(data.reviews);
        setAverageRating(data.average_rating);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const data = await getPropertyBookings(id);

        const dates = data.bookings.map((booking) => ({
          start: new Date(booking.check_in_date),
          end: new Date(booking.check_out_date),
        }));
        setBookedDates(dates);
      } catch (error) {
        console.log("Failed to fetch bookings:", error);
      }
    };

    const fetchFavourites = async () => {
      if (user) {
        try {
          const data = await getUserFavourites(user?.id, user?.token);
          console.log(data.favourites);

          const favourite = data.favourites.some(
            (fav) => fav.property_id === +id
          );
          setIsFavourited(favourite);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProperty();
    fetchReviews();

    fetchBookings();
    fetchFavourites();
  }, [id, user?.id, user?.token]);

  if (isLoading)
    return (
      <div>
        <PropertyLoadingSkeleton />
      </div>
    );
  if (hasErrored) return <div>Failed to load property.</div>;

  return (
    <div className="property-details">
      <div className="property-name">
        <h1>{property.property_name}</h1>
        <div className="save">
          <Favourite
            property={property}
            isFavorited={isFavorited}
            setIsFavorited={setIsFavourited}
          />
          save
        </div>
      </div>
      <div className="image-content">
        <div className="image-grid">
          <div className="image-box">
            {property.images[0] && (
              <img
                src={property.images[0]}
                alt="Main property"
                className="main-img"
              />
            )}
          </div>
          <div className="image-box second">
            {property.images.slice(1, 5).map((img, inderx) => (
              <div key={inderx} className="image-row">
                <img src={img} alt={`Property ${inderx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="property-main-grid">
        <div className="property-main-left">
          <div className="property-info">
            <h2>
              {property.property_type} in {property.location.split(",")[0]},{" "}
              {property.location.split(",")[1]?.trim() === "UK"
                ? "United Kingdom"
                : property.location.split(",")[1]}
            </h2>
            <p>
              Property in{" "}
              {property.location.split(",")[1]?.trim() === "UK"
                ? "United Kingdom"
                : property.location.split(",")[1]}
            </p>
            <div className="section-divider"></div>
            <div className="liked-info">
              <div className="liked-star">
                <div className="star">✨</div>
                {property.favourited_count > 9 && (
                  <div className="number">
                    {property.favourited_count}
                    <span>like</span>
                  </div>
                )}
                <div className="star">✨</div>
              </div>

              <span className="divider"></span>

              <div className="liked">
                {reviews.length !== 0 && (
                  <div>
                    <div>{averageRating}</div> <div>★★★★★</div>
                  </div>
                )}
              </div>
              <span className="divider"></span>

              <div className="liked">
                {reviews.length !== 0 && (
                  <div>
                    <div>{reviews.length}</div>
                    <div>Reviews</div>
                  </div>
                )}
              </div>
            </div>
            <div className="section-divider"></div>

            <div className="host-details">
              <img src={property.host_avatar} alt="Host image" />
              <div className="host-info">
                <div>Hosted by {property.host}</div>
                <div className="host-name">Property hosting</div>
              </div>
            </div>
            <div className="section-divider"></div>
            <div className="about-property">
              <h2>About this property</h2>
              <p>{property.description}</p>
            </div>
            <div className="section-divider"></div>
            <div className="facilities-content">
              <h2>Property facilities</h2>
              <div className="facilities">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <div className="facility" key={amenity}>
                      {Icon && <Icon className="icon-small" />}
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="section-divider"></div>

            <div id="calendar" className="calendar-display-section">
              <div className="full-calendar-container">
                <Calendar
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  setCheckInDate={setCheckInDate}
                  setCheckOutDate={setCheckOutDate}
                  monthsShown={2}
                  bookedDates={bookedDates}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="property-main-right">
          <div className="sticky-box-wrapper">
            <BookingBox
              property={property}
              checkIn={checkInDate}
              checkOut={checkOutDate}
            />
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      <Reviews reviews={reviews} setReviews={setReviews} property={property} />
    </div>
  );
}
