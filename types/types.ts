export type User = {
  uid: string;
  email: string;
  name: string;
};

export type Listing = {
  id: string;
  title: string;
  subtitle: string;
  priceString: string;
  priceLow: number;
  priceHigh: number;
  status?: string;
  occupancyYear?: number;
  datePosted: string;
  images: string[];
  longitude: number;
  latitude: number;
  description: string;
  sqftLow: number;
  sqftHigh: number;
  bathrooms: number;
  bedrooms: number;
  parking: number;
  tables?: Table[];
  lists?: List[];
  links?: Button[];
  documents?: Button[];
};

type Table = {
  title: string;
  listData?: string[];
  keyValueData?: Record<string, string>;
};

type List = {
  title: string;
  data: string[];
};

type Button = {
  label: string;
  link: string;
};
