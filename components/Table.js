import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Table = ({ destinationPort, portContext }) => {

  const [ data, setData ] = useState([])
  const rates = {
    sanAndresPort: [
      { key: 'Regular', col2: '100' },
      { key: 'PWD', col2: '50' },
      { key: 'Senior citizen', col2: '50' },
      { key: 'Student', col2: '50' },
    ],
    viracPort: [
      { key: 'Regular', col2: '80' },
      { key: 'PWD', col2: '25' },
      { key: 'Senior citizen', col2: '25' },
      { key: 'Student', col2: '25' },
    ]
  }

  useEffect(()=>{
    if(destinationPort == 'sanAndresPort') {
      setData(rates.sanAndresPort)
    } else if(destinationPort == 'viracPort') {
      setData(rates.viracPort)
    }
    return 
  }, [destinationPort])
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.key}</Text>
      <Text style={styles.cell}>{item.col2}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.row}>
          <Text style={styles.header}>Type</Text>
          <Text style={styles.header}>Fare</Text>
        </View>
      }
    />
  );
};

// Styles for the table
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    paddingLeft: 25
  },
  header: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    paddingLeft: 20
  },
});

export default Table;
