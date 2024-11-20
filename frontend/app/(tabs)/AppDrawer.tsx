import CustomDrawerContent from '@/components/CustomDrawerContent';
import { NavigationProp } from '@react-navigation/native';
import React from 'react';

interface AppDrawerProps {
  navigation: NavigationProp<any>; // Replace `any` with your app's param list type if available
  drawerVisible: boolean;
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ navigation, drawerVisible, setDrawerVisible }) => {
  const handleCloseDrawer = () => setDrawerVisible(false);

  return (
    <CustomDrawerContent
      visible={drawerVisible}
      onClose={handleCloseDrawer}
      navigation={navigation}
    />
  );
};

export default AppDrawer;
