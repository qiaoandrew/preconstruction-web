import { Filter } from '@/components/UI/Filter';

export const PRE_CONSTRUCTION_FILTERS: Filter[] = [
  {
    id: 'price',
    label: 'Price',
    type: 'range',
    min: 0,
    max: 100000000,
  },
  {
    id: 'occupancy',
    label: 'Occupancy',
    type: 'selectMany',
    options: [
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030',
      '2031',
      '2032',
      '2033',
      '2034',
      '2035',
      '2036',
      '2037',
      '2038',
      '2039',
      '2040',
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'selectMany',
    options: [
      'Registration',
      'Under Construction',
      'Final Release',
      'Completion',
    ],
  },
];

export const FOR_SALE_FILTERS: Filter[] = [
  {
    id: 'price',
    label: 'Sale Price',
    type: 'range',
    min: 0,
    max: 10000000,
  },
  {
    id: 'bedrooms',
    label: 'Bedrooms',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'parking',
    label: 'Parking Spaces',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'size',
    label: 'Size (SQFT)',
    type: 'range',
    min: 0,
    max: 10000,
  },
];

export const FOR_RENT_FILTERS: Filter[] = [
  {
    id: 'price',
    label: 'Sale Price',
    type: 'range',
    min: 0,
    max: 10000000,
  },
  {
    id: 'bedrooms',
    label: 'Bedrooms',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'parking',
    label: 'Parking Spaces',
    type: 'selectOne',
    options: ['0+', '1+', '2+', '3+', '4+', '5+'],
  },
  {
    id: 'size',
    label: 'Size (SQFT)',
    type: 'range',
    min: 0,
    max: 10000,
  },
];
