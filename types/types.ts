export type ListingGroupType = 'pre-construction' | 'for-sale' | 'for-rent';

export type PlacementType = 'carousel' | 'grid' | 'search';

export type UserType = {
  uid: string;
  email: string;
  name: string;
  provider: string;
};

export type AgentType = {
  name: string;
  email?: string;
  phone?: string;
  image?: string;
  position: string;
};

export type BlogPreviewType = {
  id: string;
  link: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

export type MenuRouteType = {
  type: string;
  text: string;
  link?: string;
  dropdown?: { text: string; link: string }[];
};

export type ListingType = {
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
  tables?: TableType[];
  lists?: ListType[];
  links?: ButtonType[];
  documents?: ButtonType[];
};

export type TableType = {
  title: string;
  listData?: string[];
  keyValueData?: Record<string, string>;
};

export type ListType = {
  title: string;
  data: string[];
};

export type ButtonType = {
  label: string;
  link: string;
};

export type ListingRecommendationType = {
  type: ListingGroupType;
  listing: ListingType;
};

export type ListingSearchResultType = {
  type: ListingGroupType;
  listing: ListingType;
};
