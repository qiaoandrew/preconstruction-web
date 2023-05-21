import { useMemo, useState } from 'react';
import { Listing } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ListingPopup from './ListingPopup';
import { Recommendation } from '@/hooks/useRecommendations';
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import { HiMapPin } from 'react-icons/hi2';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ListingsMapProps = {
  recommendations: Recommendation[];
};

export default function ListingsMap({ recommendations }: ListingsMapProps) {
  const [popup, setPopup] = useState<Recommendation | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const handlePopupOpen = (e: any, recommendation: Recommendation) => {
    e.originalEvent.stopPropagation();
    setPopup(recommendation);
  };

  const pins = useMemo(
    () =>
      recommendations.map(({ listing, type }: Recommendation, i: number) =>
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
            route={`/${
              popup.type === 'pre-construction'
                ? popup.type
                : popup.type === 'sale'
                ? 'for-sale'
                : 'for-rent'
            }/listings/${popup.listing.id}`}
          />
        </Popup>
      )}
    </Map>
  );
}
