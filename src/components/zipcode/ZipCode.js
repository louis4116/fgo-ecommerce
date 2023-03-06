import React from 'react'

import classes from "./zipcode.module.css";
const ZipCode =(props) => {
 const { city,district,zipCode,cities,districts,handleCityChange,handleDistrictChange}=props;
  return (
    <div className={classes["form-container-address-form-city"]}>
          <div className={classes["form-container-address-form-city-first"]}>
            <label htmlFor="city">縣市:</label>
            <select
              id="city"
             
              onChange={(e) => handleCityChange(e.target.value)}
              value={city}
            >
              {cities.map((city, i) => {
                return (
                  <option value={city} key={i}>
                    {city}
                  </option>
                );
              })}
            </select>
            <select
              id="district"
              
              onChange={(e) => handleDistrictChange(e.target.value)}
              value={district}
            >
              {districts[city].map((district, i) => {
                return (
                  <option value={district} key={i}>
                    {district}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={classes["form-container-address-form-city-second"]}>
            郵遞區號:
            <div className={classes["form-container-address-form-city-third"]}>
              {zipCode}
            </div>
          </div>
        </div>
  )
}

export default ZipCode