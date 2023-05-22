import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';
import { setPreConstructionListings } from '@/store/slices/preConstructionListingsSlice';
import { auth, rdb } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { decode } from '@/util/helpers';
import { UserType } from '@/types/types';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Redux>{children}</Redux>
    </Provider>
  );
}

function Redux({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            provider: user.providerData[0].providerId,
          } as UserType)
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

  return <>{loading ? null : children}</>;
}
