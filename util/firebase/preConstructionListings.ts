import { rdb } from '@/lib/firebase';
import { ref, get, child } from 'firebase/database';
import { decode } from '../helpers';
import { Listing } from '@/types/types';

export const getPreConstructionListings = async (): Promise<Listing[]> => {
  const dbRef = ref(rdb);

  const snapshot = await get(child(dbRef, 'pre-construction'));

  if (snapshot.exists()) {
    return decode(snapshot.val());
  }
  return [];
};
