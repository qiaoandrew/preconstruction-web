export type User = {
  uid: string;
  email: string;
  name: string;
  provider: string;
};

export type BlogPreview = {
  id: string;
  link: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

export type Route = {
  type: string;
  text: string;
  link?: string;
  dropdown?: { text: string; link: string }[];
};

export type Listing = {
  id: string;
  title: string;
  subtitle: string;
  priceString: string;
  priceLow: number;
  priceHigh: number;
  status?: string;
  occupancy?: number;
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

export type Table = {
  title: string;
  listData?: string[];
  keyValueData?: Record<string, string>;
};

export type List = {
  title: string;
  data: string[];
};

export type Button = {
  label: string;
  link: string;
};
