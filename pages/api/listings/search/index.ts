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
    const { query, type, pageNum, resultsPerPage } = req.query;

    const config = {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'REPLIERS-API-KEY': REPLIERS_API_KEY,
      },
    };

    const { data } = await axios.get(
      `https://sandbox.repliers.io/listings?displayAddressOnInternet=Y&displayPublic=Y&hasImages=true&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&fields=listDate,listPrice,mlsNumber,details,map,images,address,images[5]&minSqft=1&minBaths=1&minBeds=1&minGarageSpaces=1&minKitchens=1&pageNum=${pageNum}&type=${type}${
        query ? `&search=${query}` : ''
      }&resultsPerPage=${resultsPerPage ? resultsPerPage : 30}`,
      config
    );

    const listings: ListingType[] = data.listings.map((listing: any) =>
      parseListing(listing)
    );

    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    return res.status(500).end({ message: 'Internal server error.' });
  }
}
