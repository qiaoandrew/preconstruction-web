import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { limit, updateDoc, getDocs } from 'firebase/firestore';

export default function useUserType() {
  const [userType, setUserType] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const changeUserType = async (newUserType: string) => {
    const userRef = collection(db, 'users');
    const searchQuery = query(userRef, where('uid', '==', user?.uid), limit(1));
    const querySnapshot = await getDocs(searchQuery);
    const userDoc = querySnapshot.docs[0];
    await updateDoc(userDoc.ref, { userType: newUserType });
  };

  useEffect(() => {
    const queryRef = query(
      collection(db, 'users'),
      where('uid', '==', user?.uid || '')
    );

    const unsubscribe = onSnapshot(queryRef, (queryShapshot) => {
      queryShapshot.forEach((doc) => {
        setUserType((prevUserType) => {
          const newUserType = doc.data().userType;
          return newUserType !== prevUserType ? newUserType : prevUserType;
        });
      });
    });

    return unsubscribe;
  }, [user?.uid]);

  return { userType, changeUserType };
}
