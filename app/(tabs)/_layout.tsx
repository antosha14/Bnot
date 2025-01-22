import Footer from '@/components/Footer';
import React from 'react';
import { useOnlineNotification } from '@/hooks/useOnlineNotifications';
import { useUpdateStatus } from '@/hooks/useUpdateStatus';
import { useQueueNotifications } from '@/hooks/useQueueNotifications';

const RootLayout = () => {
  useOnlineNotification();
  useUpdateStatus();
  useQueueNotifications();
  return <Footer />;
};

export default RootLayout;
