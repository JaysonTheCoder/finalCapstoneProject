

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, ActivityIndicator, Title } from 'react-native-paper';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig'; // Replace with your Firebase configuration

import { MaterialIcons } from '@expo/vector-icons';

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(0);
  const db = getFirestore(app);

  const handleNext = () => {
    setDisplay((prev) => (prev + 1) % (schedules.length || 1)); // Prevent errors if data is empty
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const scheduleCollection = collection(db, 'schedule');
        const snapshot = await getDocs(scheduleCollection);

        const data = [];
        snapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 5, alignItems: 'flex-end' }}>
        <Pressable style={{width: '30%', flexDirection: 'row', justifyContent: 'flex-end'}} onPress={handleNext}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ height: '100%', }}>Next</Text>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
        </Pressable>
      </View>
      <View>
        <View style={styles.routeLabel}>
          <Text style={{fontSize: 19, padding: 10, paddingLeft: 0}}>{schedules[display].id}</Text>
        
        </View>
      </View>
      <View style={styles.cardSched}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>{ schedules[display].fromTo.label}</Text>
          <View style={{flexDirection: 'row', paddingInline: 10, backgroundColor: '#00000004'}}>
            <Text style={{flex: 1, fontSize: 10}}>route</Text>
            <Text style={{flex: 1, fontSize: 10, textAlign: 'center'}}>bus</Text>
            <Text style={{flex: 1, fontSize: 10, textAlign: 'right'}}>departure</Text>
          </View>


        </View>
        {
          schedules && Object.values(schedules[display].fromTo).map( index => {
            if(index.origin && index.destination) {
              return (
                <View>
                  
                  <View style={{padding: 5, margin: 5, flexDirection: 'row'}}>

                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>{ index.origin } → { index.destination }</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: "flex-end", flexDirection: 'row'}}>
                      <Text style={{ flex: 1}}>{ index.bus}</Text>
                      <Text style={{width: '30%', textAlign: 'right', flex: 1}}>{ index.departure }</Text>
                    </View>
                  </View>
                </View>
              )
            }
          })
        }
      </View>
      <View style={styles.cardSched}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>{ schedules[display].toFrom.label}</Text>
          <View style={{flexDirection: 'row', paddingInline: 10, backgroundColor: '#00000004'}}>
            <Text style={{flex: 1, fontSize: 10}}>route</Text>
            <Text style={{flex: 1, fontSize: 10, textAlign: 'center'}}>bus</Text>
            <Text style={{flex: 1, fontSize: 10, textAlign: 'right'}}>departure</Text>
          </View>


        </View>
        {
          schedules && Object.values(schedules[display].toFrom).map( index => {
            if(index.origin && index.destination) {
              return (
                <View>
                  
                  <View style={{padding: 5, margin: 5, flexDirection: 'row'}}>

                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>{ index.origin } → { index.destination }</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: "flex-end", flexDirection: 'row'}}>
                      <Text style={{ flex: 1}}>{ index.bus}</Text>
                      <Text style={{width: '30%', textAlign: 'right', flex: 1}}>{ index.departure }</Text>
                    </View>
                  </View>
                </View>
              )
            }
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSched: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#00000090',
    shadowRadius: 5,
    margin: 5
  }
});

export default ScheduleScreen;

