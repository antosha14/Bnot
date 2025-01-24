import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const icons = [
  <FontAwesome5 name="car-side" size={32} color="#FFFFFF" />,
  <MaterialIcons name="directions-bus" size={32} color="#FFFFFF" />,
  <FontAwesome5 name="truck" size={32} color="#FFFFFF" />,
  <MaterialIcons name="pedal-bike" size={32} color="#FFFFFF" />,
];

interface IconsGaleryProps {
  vehicleType: number;
  setVehicleType: (index: number) => void;
}

const ACTIVE_GRADIENT: readonly [string, string] = ['rgb(46, 35, 108)', 'rgb(46, 35, 108)'];
const INACTIVE_GRADIENT: readonly [string, string] = ['#363E51', '#191E26'];

const IconsGalery: React.FC<IconsGaleryProps> = ({ vehicleType, setVehicleType }) => {
  return (
    <View style={styles.carTypeContainer}>
      {icons.map((icon, index) => {
        const colors = index === vehicleType ? ACTIVE_GRADIENT : INACTIVE_GRADIENT;
        return (
          <LinearGradient
            key={index}
            colors={colors}
            style={[
              styles.iconContainer,
              { marginLeft: index === 0 ? 0 : 5, marginRight: index === icons.length - 1 ? 0 : 5 },
            ]}
          >
            <Pressable
              onPressIn={() => {
                setVehicleType(index);
              }}
              style={styles.pressableIconContainer}
            >
              {icon}
            </Pressable>
          </LinearGradient>
        );
      })}
    </View>
  );
};

export default IconsGalery;

const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgb(46, 35, 108)',
    borderRadius: 15,
  },
  pressableIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  carTypeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
});
