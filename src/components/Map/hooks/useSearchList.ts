import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { PlaceList, Place } from '@/types/map';
import { useMapContext } from '../contexts/MapContextProvider';

interface UseSearchListProps {
  handleOnClickListWithMarkers: (index: number) => void;
  handleOnClickOnlyList: (index: number) => void;
}
const useSearchList = ({ handleOnClickListWithMarkers, handleOnClickOnlyList }: UseSearchListProps) => {
  const { searchedPlaces, markerPlace } = useMapContext();
  const [placeList, setPlaceList] = useState<PlaceList | Place[]>([]);
  const listRefs = useRef<Record<number, HTMLLIElement | null>>({});

  useEffect(() => {
    setPlaceList(markerPlace.length ? markerPlace : searchedPlaces);
  }, [searchedPlaces, markerPlace]);

  const setListItemRef = useCallback((ref: HTMLLIElement | null, index: number) => {
    listRefs.current[index] = ref;
  }, []);

  const handleOnClickList = useMemo(() => {
    return markerPlace.length ? handleOnClickOnlyList : handleOnClickListWithMarkers;
  }, [markerPlace, handleOnClickOnlyList, handleOnClickListWithMarkers]);

  return { setListItemRef, handleOnClickList, placeList };
};
export default useSearchList;
