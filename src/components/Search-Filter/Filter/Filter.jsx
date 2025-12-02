import { useState, useEffect } from "react";
import Modal from "./Modal";
import PriceRange from "./PriceRange";
import PropertyType from "./PropertyType";
import Amenities from "./Amenities";
import Sort from "./Sort";
import Order from "./Order";
import "./filter.css";
import { useSearchParams } from "react-router";
import { getAmenities } from "../../../utils/api";
import FilterIcon from "../../../icons/FilterIcon";

export default function Filter({ properties }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModal, setIsModal] = useState(false);

  const [selectType, setSelectType] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [amenites, setAmenities] = useState([]);
  const [selectAmenity, setSelectAmenity] = useState([]);

  const [sort, setSort] = useState("");
  const [collapseSort, setCollapseSort] = useState(false);

  const [order, setOrder] = useState("");
  const [collapseOrder, setCollapseOrder] = useState(false);

  const propertyType = properties.map((property) => property.property_type);
  const uniquePropertyTypes = [...new Set(propertyType)];

  useEffect(() => {
    const fetchAmenities = async () => {
      const amenities = await getAmenities();
      setAmenities(amenities);
    };
    fetchAmenities();
  }, []);

  const handleSelect = () => {
    const params = Object.fromEntries(searchParams.entries());

    if (selectType) params.property_type = selectType;
    else delete params.property_type;
    if (minPrice !== 0) params.minprice = minPrice;
    else delete params.minprice;
    if (maxPrice !== 1000) params.maxprice = maxPrice;
    else delete params.maxprice;
    if (selectAmenity.length > 0) params.amenity = selectAmenity;
    else delete params.amenity;
    if (sort) params.sort = sort;
    else delete params.sort;
    if (order) params.order = order;
    else delete params.order;

    setSearchParams(params);
    setIsModal(false);
  };

  return (
    <>
      <div
        className="filter-bar"
        onClick={() => {
          setIsModal(true);
        }}
      >
        <div className="filter-symbol">
          <FilterIcon />
        </div>
        <div className="filter-section">Filters</div>
      </div>
      {isModal && (
        <Modal maxWidth="520px" onClick={() => setIsModal(false)}>
          <div className="filters">
            <div className="filter-header">Filters</div>
            <PropertyType
              uniquePropertyTypes={uniquePropertyTypes}
              selectType={selectType}
              setSelectType={setSelectType}
            />
            <PriceRange
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
            <Amenities
              amenities={amenites}
              selectAmenity={selectAmenity}
              setSelectAmenity={setSelectAmenity}
            />
            <Sort
              collapseSort={collapseSort}
              setCollapseSort={setCollapseSort}
              sort={sort}
              setSort={setSort}
            />
            <Order
              collapseOrder={collapseOrder}
              setCollapseOrder={setCollapseOrder}
              order={order}
              setOrder={setOrder}
            />
            <div className="clear-apply-buttons">
              <button
                className="clear-btn"
                onClick={() => {
                  setSelectType("");
                  setMinPrice(0);
                  setMaxPrice(1000);
                  setSelectAmenity([]);
                  setSort("");
                }}
              >
                Clear all
              </button>
              <button className="apply-btn" onClick={handleSelect}>
                Apply
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
