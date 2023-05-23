import { MenuRouteType } from '@/types/types';

export const NESTED_ROUTES: MenuRouteType[] = [
  {
    type: 'dropdown',
    text: 'Find a Home',
    dropdown: [
      {
        text: 'Pre-Construction',
        link: '/pre-construction',
      },
      {
        text: 'For Sale',
        link: '/for-sale',
      },
      {
        text: 'For Rent',
        link: '/for-rent',
      },
    ],
  },
  {
    type: 'route',
    text: 'Sell Your Home',
    link: '/sell',
  },
  // {
  //   type: 'dropdown',
  //   text: 'News',
  //   dropdown: [
  //     {
  //       text: 'Blog',
  //       link: '/blog',
  //     },
  //   ],
  // },
  {
    type: 'route',
    text: 'Our Team',
    link: '/team',
  },
  {
    type: 'route',
    text: 'Blog',
    link: '/blog',
  },
  {
    type: 'dropdown',
    text: 'Contact Us',
    dropdown: [
      {
        text: 'Contact an Agent',
        link: '/contact/agent',
      },
      {
        text: 'Add a Development',
        link: '/contact/add-development',
      },
      {
        text: 'Report a Problem',
        link: '/contact/report-problem',
      },
    ],
  },
];

export const ROUTES = [
  { text: 'Pre-Construction', link: '/pre-construction' },
  { text: 'For-Sale', link: '/for-sale' },
  { text: 'For Rent', link: '/for-rent' },
  { text: 'Sell Your Home', link: '/sell-your-home' },
  { text: 'Blog', link: '/blog' },
  { text: 'Our Team', link: '/team' },
  { text: 'Contact an Agent', link: '/contact/agent' },
  { text: 'Add a Development', link: '/contact/add-development' },
  { text: 'Report a Problem', link: '/contact/report-problem' },
];
