import { Text, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import db from '@/data/sourceDb';
import IconsGalery from '@/components/IconsGalery';
import QueueEntry from '@/components/QueueEntry';
import RegistrationNumberSearch from '@/components/RegistrationNumberSearch';
import { queueMapping } from '@/constants/types';
import { useNotification } from '@/contexts/NotificationContext';
import { ApiResponse, QueueEntryFromApi } from '@/constants/types';

type CountryKey = keyof typeof db;

function Home() {
  const [start, setStart] = useState<CountryKey>('Belarus');
  const [checkpoint, setСheckpoint] = useState(db[start].zonesFrom[0].zoneName);
  const [vehicleType, setVehicleType] = useState(0);
  const [queueData, setQueueData] = useState<ApiResponse | null>(null);
  const [queueVisible, setQueueVisible] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const scrollRef = useRef();
  const { expoPushToken } = useNotification();

  let filteredQueue;

  if (queueData && queueData.info) {
    filteredQueue = queueData[queueMapping[vehicleType]].filter((car: QueueEntryFromApi) => {
      return car.regnum.startsWith(registrationNumber);
    });
  }

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setQueueData(result);
    } catch (e: any) {
      setError(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const zoneIndex = db[start].zonesFrom.findIndex(obj => obj.zoneName === checkpoint);
  useEffect(() => {
    fetchData(db[start].zonesFrom[zoneIndex].zoneLink);
  }, [checkpoint]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView ref={scrollRef}>
        <View style={styles.entryContainer}>
          <Text style={styles.inputLabel}>Select a country you are leaving</Text>
          <Picker
            style={styles.searchBoxStyles}
            selectedValue={start}
            onValueChange={(itemValue, itemIndex) => setStart(itemValue)}
          >
            <Picker.Item label="Belarus" value="Belarus" />
          </Picker>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.inputLabel}>Select a checkpoint</Text>
          <Picker
            style={styles.searchBoxStyles}
            selectedValue={checkpoint}
            onValueChange={(itemValue, itemIndex) => setСheckpoint(itemValue)}
          >
            {db[start].zonesFrom.map(zone => (
              <Picker.Item label={zone.zoneName} value={zone.zoneName} key={zone.zoneId} />
            ))}
          </Picker>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.inputLabel}>Select your vehicle type</Text>
          <IconsGalery vehicleType={vehicleType} setVehicleType={setVehicleType} />
        </View>
        <View style={styles.entryContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.redirectButton,
              {
                opacity: pressed ? 0.8 : 1,
                backgroundColor: queueVisible ? '#D3D3D3' : 'rgb(46, 35, 108)',
              },
            ]}
            onPress={() => setQueueVisible(queueVisible => !queueVisible)}
          >
            <Text style={[styles.redirectButtonText, { color: queueVisible ? `#000` : `#FFF` }]}>
              {queueVisible ? `Hide Queue` : `View Queue`}
            </Text>
          </Pressable>
        </View>
        <View style={styles.entryContainer}>
          {queueVisible && loading && (
            <>
              {[...Array(5)].map((_, index) => (
                <View key={index} style={styles.skeletonItem}>
                  <View style={[styles.skeletonLine, { width: '90%', marginTop: 8 }]} />
                  <View style={[styles.skeletonLine, { width: '60%', marginTop: 3 }]} />
                </View>
              ))}
            </>
          )}
          {queueVisible && !loading && error && <Text style={styles.inputLabel}>Error fetching queue data</Text>}
          {queueVisible && !loading && !error && (
            <Suspense fallback={<Text>Loading...</Text>}>
              {filteredQueue[0] &&
                filteredQueue.slice(0, 10).map(car => {
                  let index =
                    queueData[queueMapping[vehicleType]].findIndex(trip => {
                      return trip.regnum === car.regnum;
                    }) + 1;
                  return (
                    <QueueEntry
                      car={{
                        ...car,
                        from: start,
                        checkpoint: checkpoint,
                        initialQueuePosition: index,
                        type_queue: vehicleType,
                        link: db[start].zonesFrom[zoneIndex].zoneLink,
                        token: expoPushToken,
                      }}
                      key={car.regnum}
                    ></QueueEntry>
                  );
                })}
            </Suspense>
          )}
          {queueVisible && !filteredQueue.length && !loading && !error && (
            <Text style={styles.inputLabel}>No vehicles in this queue</Text>
          )}
          {queueVisible && (filteredQueue.length > 10 || registrationNumber) && !loading && !error && (
            <RegistrationNumberSearch
              unshownCars={filteredQueue.length - 10}
              setRegistrationNumber={setRegistrationNumber}
              placeholder={registrationNumber}
              scrollRef={scrollRef}
            ></RegistrationNumberSearch>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
  },
  searchBoxStyles: {
    backgroundColor: '#FFF',
    marginTop: 4,
    borderRadius: 15,
  },
  entryContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  inputLabel: {
    marginTop: 8,
    color: '#FFF',
    fontWeight: 600,
  },

  redirectButton: {
    backgroundColor: 'rgb(46, 35, 108)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20,
    marginTop: 5,
  },
  redirectButtonText: { color: '#FFF', fontSize: 18, fontWeight: 600, backgroundColor: 'none' },
  skeletonItem: { padding: 10, backgroundColor: '#FFF', borderRadius: 14, marginBottom: 5 },
  skeletonLine: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default Home;
