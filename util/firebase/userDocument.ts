import { db } from '@/lib/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export type UserDocument = {
  uid: string;
  type: 'buyer' | 'agent';
};

export const createUserDocument = async (uid: string) => {
  const usersRef = collection(db, 'users');
  const searchQuery = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(searchQuery);
  if (querySnapshot.empty) {
    const userDocument: UserDocument = {
      uid,
      type: 'buyer',
    };
    await addDoc(usersRef, userDocument);
  }
};
