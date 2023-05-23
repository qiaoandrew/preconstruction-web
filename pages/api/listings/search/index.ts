import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ListingType } from '@/types/types';
import { parseListing } from '@/util/helpers';

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListingType[]>
) {
  if (req.method !== 'GET')
    return res.status(405).end({ message: 'Method not allowed.' });

  try {
    const {
      query,
      type,
      pageNum,
      resultsPerPage,
      minPrice,
      maxPrice,
      minBeds,
      minBaths,
      minParkingSpaces,
      minSqft,
      maxSqft,
    } = req.query;

    const config = {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'REPLIERS-API-KEY': REPLIERS_API_KEY,
      },
    };

    console.log('Min price: ', minPrice);
    console.log('Min SQFT: ', minSqft);

    const url = `https://sandbox.repliers.io/listings?displayAddressOnInternet=Y&displayPublic=Y&hasImages=true&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&fields=listDate,listPrice,mlsNumber,details,map,images,address,images[5]&minBaths=${
      minBaths ? minBaths : '1'
    }&minBeds=${minBeds ? minBeds : '1'}&minParkingSpaces=${
      minParkingSpaces ? minParkingSpaces : '1'
    }&minKitchens=1&pageNum=${pageNum}&type=${type}${
      query ? `&search=${query}` : ''
    }&resultsPerPage=${resultsPerPage ? resultsPerPage : '30'}${
      minPrice ? `&minPrice=${minPrice}` : '1'
    }${maxPrice ? `&maxPrice=${maxPrice}` : ''}${
      minSqft ? `&minSqft=${minSqft}` : '1'
    }${maxSqft ? `&maxSqft=${maxSqft}` : ''}`;

    console.log(url);

    const { data } = await axios.get(url, config);

    const listings: ListingType[] = data.listings.map((listing: any) =>
      parseListing(listing)
    );

    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    return res.status(500).end({ message: 'Internal server error.' });
  }
}
