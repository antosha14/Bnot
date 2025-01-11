import { Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

let url = 'https://mon.declarant.by/zone';

function Home() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.text();
      setData(result);
    } catch (err) {
      setData(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        <Text>{data}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#4C4DDC',
    flex: 1,
  },
});

export default Home;
