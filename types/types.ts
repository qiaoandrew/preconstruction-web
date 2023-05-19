export interface Listing {
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
  sqft: number;
  bathrooms: number;
  bedrooms: number;
  parking: number;
  tables: Table[];
  lists: List[];
  links?: Button[];
  documents?: Button[];
}

interface Table {
  title: string;
  listData?: string[];
  keyValueData?: Record<string, string>;
}

interface List {
  title: string;
  data: string[];
}

interface Button {
  label: string;
  link: string;
}
