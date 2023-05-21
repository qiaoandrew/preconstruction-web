import Image from 'next/image';
import Map, {
  Marker,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import { HiMapPin } from 'react-icons/hi2';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type ListingMapProps = {
  latitude: number;
  longitude: number;
};

export default function ListingMap({ latitude, longitude }: ListingMapProps) {
  return (
    <div className='mx-container-sm aspect-square xs:aspect-[3/2] sm:aspect-[5/2]'>
      <Map
        initialViewState={{
          latitude: latitude,
          longitude: longitude,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        scrollZoom={false}
        mapStyle='mapbox://styles/mapbox/outdoors-v10'
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl position='top-left' />
        <FullscreenControl position='top-left' />
        <NavigationControl position='top-left' />
        <ScaleControl />

        <Marker longitude={longitude} latitude={latitude} anchor='bottom'>
          <HiMapPin size={32} color='#D23A2E' />
        </Marker>
      </Map>
    </div>
  );
}
