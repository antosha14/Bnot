import { Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TripCard } from '@/components/TripCard';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { dummyHistoryEntree } from '@/constants/types';

const History = () => {
  const [history, setHistory] = useAsyncStorage('history', []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        {history.length === 0 ? (
          <>
            <TripCard trip={dummyHistoryEntree}></TripCard>
            <Text style={styles.description}>
              This is an example of how history entree would look like. You haven't completed any trips at the moment.
              Complete a new trip to add real history item
            </Text>
          </>
        ) : (
          history.reverse().map((trip: any) => {
            return <TripCard trip={trip} key={trip.endTime} setHistory={setHistory}></TripCard>;
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    fontWeight: 500,
    marginTop: 15,
    marginRight: 8,
    marginLeft: 8,
  },
});

export default History;
