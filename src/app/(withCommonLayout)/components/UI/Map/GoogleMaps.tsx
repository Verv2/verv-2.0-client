"use client";
import envConfig from "@/config/envConfig";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

interface IGoogleMapsProps {
  locationMarker: {
    lat?: number;
    lng?: number;
  };
}

const GoogleMaps = ({ locationMarker }: IGoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  console.log("Google Maps component locationMarker", locationMarker);

  useEffect(() => {
    console.log("Google Maps component mounted");

    const initMap = async () => {
      const loader = new Loader({
        apiKey: envConfig.googleMapApiKey as string,
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      //   const location = { lat: -34.397, lng: 150.644 };
      const location = {
        lat: locationMarker?.lat ?? 0,
        lng: locationMarker?.lng ?? 0,
      };
      const options: google.maps.MapOptions = {
        center: location,
        zoom: 15,
        mapId: "map",
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      //   use an array of location property data to map through and create markers
      new AdvancedMarkerElement({
        position: location,
        map: map,
        title: `Property ${locationMarker?.lat}, ${locationMarker?.lng}`,
      });
    };

    initMap()
      .then(() => {
        console.log("Google Maps loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-[800px] h-[275px]" />
    </>
  );
};

export default GoogleMaps;
