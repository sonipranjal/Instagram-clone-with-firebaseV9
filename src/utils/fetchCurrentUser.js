import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { auth, db } from '../lib/firebase';
import { GlobalDispatchContext } from '../state/context/GlobalContext';

const useFetchCurrentUser = () => {
  const fetchUser = async () => {
    // find the user info with the help of id or email
    if (!auth?.currentUser?.email) return;
    const currentUserRef = doc(db, 'users', auth.currentUser.email);
    const currentUserSnap = await getDoc(currentUserRef);

    if (currentUserSnap.exists()) {
      return currentUserSnap.data();
    } else {
      return null;
    }
  };

  return { fetchUser };
};

export default useFetchCurrentUser;
