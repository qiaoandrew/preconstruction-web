import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';
import { setPreConstructionListings } from '@/store/slices/preConstructionListingsSlice';
import { auth, rdb } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { decode } from '@/util/helpers';
import { User } from '@/types/types';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Redux>{children}</Redux>
    </Provider>
  );
}

function Redux({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          } as User)
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const preConstructionref = ref(rdb, 'pre-construction');
    const unsubscribe = onValue(preConstructionref, (snapshot) => {
      dispatch(setPreConstructionListings(decode(snapshot.val())));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
