import { Text, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState, useDeferredValue, Suspense, useRef, ActivityIndicator } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import db from '@/data/sourceDb';
import IconsGalery from '@/components/IconsGalery';
import QueueEntry from '@/components/QueueEntry';
import RegistrationNumberSearch from '@/components/RegistrationNumberSearch';
import { queueMapping } from '@/constants/types';

function Home() {
  const [start, setStart] = useState('Belarus');
  const [checkpoint, setСheckpoint] = useState(db[start].zonesFrom[0].zoneName);
  const [vehicleType, setVehicleType] = useState(0);
  const [queueData, setQueueData] = useState({});
  const deferredValue = useDeferredValue(queueData);
  const [queueVisible, setQueueVisible] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const scrollRef = useRef();

  let filteredQueue;

  if (deferredValue && deferredValue.info) {
    filteredQueue = deferredValue[queueMapping[vehicleType]].filter(car => {
      return car.regnum.startsWith(registrationNumber);
    });
  }

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setQueueData(result);
    } catch (err) {
      setQueueData({ message: err.message });
    }
  };

  useEffect(() => {
    const index = db[start].zonesFrom.findIndex(obj => obj.zoneName === checkpoint);
    fetchData(db[start].zonesFrom[index].zoneLink);
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
          {queueVisible && (
            <Suspense fallback={<Text>Loading...</Text>}>
              {filteredQueue[0] &&
                filteredQueue.slice(0, 10).map(car => {
                  let index =
                    deferredValue[queueMapping[vehicleType]].findIndex(trip => {
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
                      }}
                      key={car.regnum}
                    ></QueueEntry>
                  );
                })}
            </Suspense>
          )}
          {queueVisible && !filteredQueue.length && <Text style={styles.inputLabel}>No vehicles in this queue</Text>}
          {queueVisible && (filteredQueue.length > 10 || registrationNumber) && (
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
});

export default Home;
