import { rdb } from '@/lib/firebase';
import { ref, get, child } from 'firebase/database';
import { decode } from '../helpers';
import { ListingType } from '@/types/types';

export const getPreConstructionListings = async (): Promise<ListingType[]> => {
  const dbRef = ref(rdb);

  const snapshot = await get(child(dbRef, 'pre-construction'));

  if (snapshot.exists()) {
    return decode(snapshot.val());
  }
  return [];
};
