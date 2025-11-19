import axios from "axios";

export const getProperties = async (filter = {}) => {
  const {
    data: { properties },
  } = await axios.get("https://airbnc-b0sn.onrender.com/api/properties", {
    params: {
      location: filter.location,
      //amenity: filter.amenity
    },
  });

  return properties;
};
