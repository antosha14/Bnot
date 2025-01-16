import Footer from '@/components/Footer';
import React from 'react';
import { useOnlineNotification } from '@/hooks/useOnlineNotifications';

const RootLayout = () => {
  useOnlineNotification();
  return <Footer />;
};

export default RootLayout;
