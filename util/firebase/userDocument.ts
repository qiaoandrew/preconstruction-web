import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { User } from '@/types/types';

export type UserDocument = {
  uid: string;
  email: string;
  name: string;
  type: 'buyer' | 'agent';
};

export const createUserDocument = async (user: User) => {
  const usersRef = collection(db, 'users');
  const searchQuery = query(usersRef, where('uid', '==', user.uid));
  const querySnapshot = await getDocs(searchQuery);
  if (querySnapshot.empty) {
    const userDocument: UserDocument = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      type: 'buyer',
    };
    await addDoc(usersRef, userDocument);
  }
};

export const getUserDocument = async (
  uid: string
): Promise<UserDocument | null> => {
  const usersRef = collection(db, 'users');
  const searchQuery = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(searchQuery);
  if (querySnapshot.empty) return null;
  const userDocument = querySnapshot.docs[0].data() as UserDocument;
  return userDocument;
};

export const updateUserDocument = async (
  uid: string,
  name?: string,
  email?: string,
  type?: 'buyer' | 'agent'
) => {
  const usersRef = collection(db, 'users');
  const searchQuery = query(usersRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(searchQuery);
  if (querySnapshot.empty) {
    throw new Error('User not found');
  }
  const userDocument = querySnapshot.docs[0].data() as UserDocument;
  const updatedUserDocument: UserDocument = {
    uid: uid,
    email: email || userDocument.email,
    name: name || userDocument.name,
    type: type || userDocument.type,
  };
  await updateDoc(querySnapshot.docs[0].ref, updatedUserDocument);
};
