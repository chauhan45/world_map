
import mapData from "./data/countries.json"
import "leaflet/dist/leaflet.css";
import React, { useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import { SelectedData } from "./SelectedData";
import { Search } from "react-bootstrap-icons";
const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [countryDetails, setCountryDetails] = useState(null);
  const [CountrInput, setCountrInput] = useState(null);

  const countryStyle = {
    fillColor: '#a0a0a0',
    fillOpacity: 0.7,
    color: '#ffffff',
    weight: 1,
  };

  const selectedCountryStyle = {
    fillColor: 'blue',
    fillOpacity: 0.7,
    color: '#ffffff',
    weight: 1,
  };

  const onCountryClick = (event) => {

    const layer = event.layer || event.originalEvent.target || event.target;
    const countryFeature = layer.feature;

    if (countryFeature && countryFeature.properties) {
      const countryName = countryFeature.properties.ADMIN;
      const countryCode = countryFeature.properties.ISO_A3;
      setCountrInput(countryName)


      setSelectedCountry((prevSelected) => (prevSelected === countryName ? null : countryName));
      dataFetch(countryName)

    }
  };

  const dataFetch = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (countryName === "India" || CountrInput === "india") {
          setCountryDetails(data[1]);
        } else {
          setCountryDetails(data[0]);
          console.log(data)
        }
      })
      .catch((error) => {
        console.error('Error fetching country details:', error);
      });
  }


  const HandelSearch = (e) => {
    e.preventDefault()
    dataFetch(CountrInput)
    setSelectedCountry((prevSelected) => (prevSelected === CountrInput ? null : CountrInput));
  }

  return (
    <>
      <div className="InputFeild">
        <form onSubmit={HandelSearch}>
          <input placeholder="Enter Counter Name" className="Input" onChange={(e) => setCountrInput(e.target.value)} value={CountrInput} />
          <Search type="submit" className="button" />
        
        </form>
      </div>
      <div>

        <div className="row MainDiv">
          <div className="col-8">
            <MapContainer style={{ height: "100vh" }} zoom={2} center={[20, 100]}>
              <GeoJSON
                style={(feature) => ({
                  ...countryStyle,
                  fillColor:
                    selectedCountry === feature.properties?.ADMIN || CountrInput?.toLowerCase() === feature?.properties.ADMIN?.toLowerCase()
                      ? selectedCountryStyle?.fillColor
                      : countryStyle?.fillColor,
                })}
                data={mapData.features}
                eventHandlers={{
                  click: onCountryClick,
                }}
              />
            </MapContainer>
          </div>
          <div className="col-4 m-auto p-5" >

            <SelectedData countryDetails={countryDetails} />
          </div>

        </div>

      </div>
    </>
  );
};

export default WorldMap;
