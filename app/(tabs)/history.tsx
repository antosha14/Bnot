import { Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TripCard, Trip } from '@/components/TripCard';

let newTrip = {
  from: 'Belarus',
  to: 'Lithvania',
  location: 'Григоровщина',
  startTime: new Date(Date.now()),
  initialQueuePosition: 10,
  endTime: new Date(Date.now()),
  finishStatus: 1,
  vehicleType: 'Легковой автомобиль',
};

const History = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
        <TripCard trip={newTrip}></TripCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
  },
});

export default History;
