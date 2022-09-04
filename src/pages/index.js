import { useContext, useState } from 'react';
import Auth from '../components/Auth';
import Feed from '../components/Feed';
import { GlobalContext } from '../state/context/GlobalContext';

const HomePage = () => {
  const { isAuthenticated, isOnboarded } = useContext(GlobalContext);

  return isAuthenticated && isOnboarded ? <Feed /> : <Auth />;
};

export default HomePage;
