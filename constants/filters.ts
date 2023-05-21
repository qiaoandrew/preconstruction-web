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
