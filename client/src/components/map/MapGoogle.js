import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./globals.css";
import { mapKey } from "../../utils/config";
import { PlacesAutocomplete } from "./PlacesAutocomplete";

import { validateProject } from "../../utils/validation";
import { url_place } from "../../utils/config";

export default function Places(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Cargando...</div>;
  return <MapContainer {...props} />;
}

const newMap = {
  initLocation: { lat: 0, lng: 0 },
  currentLocation: { lat: 0, lng: 0 },
  zoom: 13,
};

const MapContainer = ({ setInput, setErrors }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(newMap);
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMap({
          ...map,
          initLocation: {
            lat: latitude,
            lng: longitude,
          },
          currentLocation: {
            lat: latitude,
            lng: longitude,
          },
        });
        setInput((prevInput) => ({
          ...prevInput,
          location: `${url_place}${latitude},${longitude},${map.zoom}z?entry=ttu`,
        }));
        setErrors(
          validateProject((prevInput) => ({
            ...prevInput,
            location: `${url_place}${latitude},${longitude},${map.zoom}z?entry=ttu`,
          }))
        );
        setLoaded(true);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
      }
    );
  };

  const handleClick = (e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMap({
      ...map,
      currentLocation: { lat, lng },
    });
    setInput((prevInput) => ({
      ...prevInput,
      location: `${url_place}${lat},${lng},${map.zoom}z?entry=ttu`,
    }));
    setErrors(
      validateProject((prevInput) => ({
        ...prevInput,
        location: `${url_place}${lat},${lng},${map.zoom}z?entry=ttu`,
      }))
    );
  };

  return (
    <>
      <GoogleMap
        zoom={map?.zoom}
        center={map?.currentLocation}
        ref={mapRef}
        mapContainerClassName="map-container"
        onLoad={onLoad}
        onClick={handleClick}
      >
        <div className="places-container">
          <PlacesAutocomplete
            loaded={loaded}
            map={map}
            setMap={setMap}
            setInput={setInput}
            setErrors={setErrors}
          />
        </div>
        {map?.currentLocation && (
          <Marker
            position={map?.currentLocation}
            title={`Lat: ${map?.currentLocation?.lat}, Lng: ${map?.currentLocation?.lng}`}
          />
        )}
      </GoogleMap>
    </>
  );
};
