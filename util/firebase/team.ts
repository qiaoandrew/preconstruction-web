import { rdb } from '@/lib/firebase';
import { ref, get, child } from 'firebase/database';
import { decode } from '../helpers';

export const getTeam = async () => {
  const dbRef = ref(rdb);
  const snapshot = await get(child(dbRef, 'team'));
  if (snapshot.exists()) {
    return decode(snapshot.val());
  }
  return [];
};
