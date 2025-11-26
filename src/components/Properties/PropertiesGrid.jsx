import PropertiesCard from "../Properties/PropertiesCard";
import Filter from "../Search-Filter/Filter/Filter";
import Search from "../Search-Filter/Search/Search";
import { getProperties } from "../../utils/api";
import { useEffect, useState } from "react";
import "./PropertiesGrid.css";
import { useSearchParams } from "react-router";
import LoadingSkeleton from "./LoadingSkeleton";

export default function PropertiesGrid() {
  const [properties, setProperties] = useState([]);
  const [filterProperties, setFilterProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(null);
  const [searchParams] = useSearchParams();

  const fetchFilterProperties = async () => {
    const filterProperties = await getProperties();
    setFilterProperties(filterProperties);
  };

  const fetchProperties = async () => {
    try {
      // Convert all query parameters into a plain object
      // searchParams.entries() makes array of arrays [ ["location", "London"], ["amenity", "Pool"] ]
      // Object.fromEntries { location: "London", amenity: "Pool" }
      const filters = Object.fromEntries(searchParams.entries());

      const amenities = searchParams.getAll("amenity");
      if (amenities.length > 0)
        filters.amenity = amenities; //{ amenity: ["TV", "Kitchen"] }
      else delete filters.amenity;

      const properties = await getProperties(filters);
      setProperties(properties);
      setIsLoading(false);
    } catch (error) {
      setHasErrored("Failed to load properties. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  useEffect(() => {
    fetchFilterProperties();
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  if (hasErrored) return <div className="error-message">{hasErrored}</div>;

  return (
    <div className="Properties">
      <div className="search-filter">
        <Search properties={properties} />
        <Filter properties={filterProperties} />
      </div>

      <div className="propertiesGrid">
        {properties.map((property) => {
          return (
            <PropertiesCard key={property.property_id} property={property} />
          );
        })}
      </div>
    </div>
  );
}
