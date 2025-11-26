import axios from "axios";

export const getProperties = async (filter = {}) => {
  // console.log(filter) -> {location: 'London, UK'} params turns it to object

  const params = {};

  if (filter.location) params.location = filter.location;
  if (filter.check_in_date) params.check_in_date = filter.check_in_date;
  if (filter.check_out_date) params.check_out_date = filter.check_out_date;
  if (filter.property_type) params.property_type = filter.property_type;
  if (filter.minprice) params.minprice = filter.minprice;
  if (filter.maxprice) params.maxprice = filter.maxprice;
  if (filter.amenity) params.amenity = filter.amenity;
  if (filter.sort) params.sort = filter.sort;
  if (filter.order) params.order = filter.order;

  const {
    data: { properties },
  } = await axios.get("https://airbnc-b0sn.onrender.com/api/properties", {
    params,
    paramsSerializer: {
      indexes: null, // Forces array format: 'repeat' -> amenity=TV&amenity=Kitchen
    },
  });

  return properties;
};

export const getAmenities = async () => {
  const {
    data: { amenities },
  } = await axios.get("https://airbnc-b0sn.onrender.com/api/amenities");

  return amenities;
};

export const signup = async (credentials) => {
  const { data } = await axios.post(
    "https://airbnc-b0sn.onrender.com/signup",
    credentials
  );
  return data;
};

export const login = async (credentials) => {
  const { data } = await axios.post(
    "https://airbnc-b0sn.onrender.com/login",
    credentials
  );
  return data;
};

export const favouriteProperty = async (propertyId, userId, token) => {
  const { data } = await axios.post(
    `https://airbnc-b0sn.onrender.com/api/properties/${propertyId}/favourite`,
    { guest_id: userId }, // body
    {
      headers: {
        Authorization: `Bearer ${token}`, // token
      },
    }
  );
  console.log(data);
  return data;
};

export const unfavouriteProperty = async (propertyId, userId, token) => {
  const { data } = await axios.delete(
    `https://airbnc-b0sn.onrender.com/api/properties/${propertyId}/users/${userId}/favourite`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
