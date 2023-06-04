import React, { createRef, useState } from "react";
import GoogleMapReact from "google-map-react";

import "./styles.css";

const myRef = createRef();
const API_KEY ='AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMapa';

const newData = {
  isMapsLoaded: false,
  map: null,
  maps: null,
  selectedLocation: 1,
};

export const Map = () => {
  const [data, setData] = useState(newData);

  const handleApiLoaded = ({ map, maps }) => {
    setData({
      ...data,
      isMapsLoaded: true,
      map: map,
      maps: maps,
    });
  };

  // const onSelectLocation = (value) => {
  //   setData({...data, selectedLocation: value });
  // };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={{}}
        defaultZoom={5}
        ref={myRef}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded({ map, maps })}
      ></GoogleMapReact>
    </div>
  );
};
