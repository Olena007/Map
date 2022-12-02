import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

function DirectionsRenderer(props: {
  map: google.maps.Map | null;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}) {
  async function getRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ): Promise<google.maps.DirectionsResult> {
    const directionsService = new google.maps.DirectionsService();
    return new Promise(function (resolve, reject) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result: any, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(result);
          }
        }
      );
    });
  }

  async function renderRoute() {
    const directions = await getRoute(props.origin, props.destination);
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(props.map);
    directionsRenderer.setDirections(directions);
  }

  useEffect(() => {
    renderRoute().catch((err) => {
      console.log(err);
    });
  }, []);

  return null;
}

function MapWithADirectionsRenderer(props: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  function handleApiLoaded(mapInstance: google.maps.Map, google: any) {
    setMap(mapInstance);
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "--Google Maps Key goes here--" }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {map && (
          <DirectionsRenderer
            map={map}
            origin={{ lat: 40.756795, lng: -73.954298 }}
            destination={{ lat: 41.756795, lng: -78.954298 }}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default MapWithADirectionsRenderer;
