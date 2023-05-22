import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ListingRecommendationType } from '@/hooks/useRecommendations';
import ListingPopup from './ListingPopup';
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { HiMapPin } from 'react-icons/hi2';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ListingsMapProps = {
  recommendations: ListingRecommendationType[];
};

export default function ListingsMap({ recommendations }: ListingsMapProps) {
  const [popup, setPopup] = useState<ListingRecommendationType | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const handlePopupOpen = (
    e: any,
    recommendation: ListingRecommendationType
  ) => {
    e.originalEvent.stopPropagation();
    setPopup(recommendation);
  };

  const pins = useMemo(
    () =>
      recommendations.map(
        ({ listing, type }: ListingRecommendationType, i: number) =>
          listing.longitude ? (
            <Marker
              longitude={listing.longitude}
              latitude={listing.latitude}
              anchor='bottom'
              onClick={(e: any) => handlePopupOpen(e, { listing, type })}
              key={`marker-${i}`}
            >
              <HiMapPin size={24} color='#D23A2E' className='cursor-pointer' />
            </Marker>
          ) : null
      ),
    [recommendations]
  );

  return (
    <Map
      initialViewState={{
        latitude: 43.5,
        longitude: -79.5,
        zoom: 8.2,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle='mapbox://styles/mapbox/outdoors-v10'
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      <GeolocateControl position='top-left' />
      <FullscreenControl position='top-left' />
      <NavigationControl position='top-left' />
      <ScaleControl />
      {user && pins}
      {popup && (
        <Popup
          anchor='top'
          longitude={popup.listing.longitude}
          latitude={popup.listing.latitude}
          closeButton={false}
          closeOnClick={false}
        >
          <ListingPopup
            title={popup.listing.title}
            subtitle={popup.listing.subtitle}
            image={popup.listing.images[0]}
            closePopup={() => setPopup(null)}
            route={`/${popup.type}/listings/${popup.listing.id}`}
          />
        </Popup>
      )}
    </Map>
  );
}
