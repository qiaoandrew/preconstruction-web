import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Listing } from '@/types/types';
import { parseListing } from '@/util/helpers';

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Listing>
) {
  if (req.method !== 'GET')
    return res.status(405).end({ message: 'Method not allowed.' });

  const { mlsNumber } = req.query;

  try {
    const config = {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'REPLIERS-API-KEY': REPLIERS_API_KEY,
      },
    };

    const { data } = await axios.get(
      `https://sandbox.repliers.io/listings/${mlsNumber}`,
      config
    );

    const listing: Listing = parseListing(data);

    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).end({ message: 'Internal server error.' });
  }
}
