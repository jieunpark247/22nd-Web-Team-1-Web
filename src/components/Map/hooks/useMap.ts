/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, RefObject } from 'react';
import { createMap, createMarker, getCurrentCoordinate } from '../utils/mapUtils';
interface InitMapResult {
  map: any;
  marker: React.MutableRefObject<any>;
}
const useMap = (mapRef: RefObject<HTMLDivElement>): InitMapResult => {
  const [map, setMap] = useState();
  const marker = useRef<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const initialize = async () => {
        try {
          const location = await getCurrentCoordinate();
          const mapInfo = createMap(mapRef.current, location);
          setMap(mapInfo);
          marker.current = createMarker(null);
          marker.current.setMap(mapInfo);
        } catch (error) {
          console.error('Error getting current position:', error);
        }
      };
      initialize();
    });
  }, [mapRef]);

  return { map, marker };
};

export default useMap;
