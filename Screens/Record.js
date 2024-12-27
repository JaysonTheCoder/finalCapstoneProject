

import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { onSnapshot, updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AuthContext } from '../contexts/AuthContext';
import CustomDropdown from '../components/DropdownRecord';

export default function Record() {
  const [currentDate, setCurrentDate] = useState('');
  const [expenses, setExpenses] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [numberOfTrips, setNumberOfTrips] = useState(0);
  const [routeSelection, setRouteSelection] = useState([]);


  const [ routeSelected, setRouteSelected ] = useState('')

  const { bus_number, conductorName, id, setConductorName } = useContext(AuthContext)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const getCurrentYear = () => dayjs().tz('Asia/Manila').year();
  const getPhilippinesMonthName = () => months[dayjs().tz('Asia/Manila').month()];
  const getDayOfMonth = () => dayjs().tz('Asia/Manila').date();

  useEffect(() => {
    const date = new Date();
    const options = {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-PH', options).format(date);
    setCurrentDate(formattedDate);

  }, []);



  useEffect(()=>{
    try {
      const collectionRef = collection(db, 'schedule')
      const subs = onSnapshot(collectionRef, (snap) => {
        var routeOP = []
        snap.forEach( doc => {
          routeOP.push(doc.id)

        })
        setRouteSelection(routeOP)
      })

    }catch(err) {
      throw err
    }
  }, [])

  const handleSubmit = async () => {
    setLoading(true);
    const errors = {};

    if (!revenue || isNaN(revenue) || revenue <= 0) {
      errors.emptyRevenue = 'Revenue is required and must be a positive number.';
    }
    if (!expenses || isNaN(expenses) || expenses < 0) {
      errors.emptyExpenses = 'Expenses must be a valid number.';
    }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const year = getCurrentYear().toString();
        const month = getPhilippinesMonthName();
        const day = getDayOfMonth().toString();
        const docRef = doc(db, `reports/${year}/Months/${month}`);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const currentDayData = data.days?.[day] || { revenue: 0, expenses: 0 };

          const updatedDays = {
            ...data.days,
            [Object.values(data.days).length]: {
              revenue: currentDayData.revenue + Number(revenue),
              expenses: currentDayData.expenses + Number(expenses),
              time_reported: {
                month: months.indexOf(month) + 1,
                day: Number(day),
                year: Number(year)
              },
              id: id,
              bus_number: bus_number,
              name: conductorName,
              trips: numberOfTrips,
              route: routeSelected
            },
          };

          await updateDoc(docRef, { days: updatedDays });
          console.log('Document updated successfully!');
        } else {
          console.error('Document does not exist!');
        }
      } catch (err) {
        console.error('Error updating document:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.recordContainer}>
      {loading && <Text>Loading...</Text>}
      <View style={styles.recordHeader}>
        <Text style={styles.title}>Create New Record</Text>
        <Text>{currentDate}</Text>
      </View>
      <View style={styles.recordForm}>
        <TextInput
          placeholder="Enter expenses"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => setExpenses(Number(value))}
        />
        {error.emptyExpenses && <Text style={styles.error}>{error.emptyExpenses}</Text>}
        <TextInput
          placeholder="Enter revenue"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => setRevenue(Number(value))}
        />
        <TextInput
          placeholder="Enter number of trips"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => setNumberOfTrips(Number(value))}
        />
        {error.emptyRevenue && <Text style={styles.error}>{error.emptyRevenue}</Text>}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
          <MaterialIcons name="done" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recordContainer: { padding: 20 },
  recordHeader: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '600' },
  recordForm: { gap: 15 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10 },
  submitButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0fb37a', padding: 15, borderRadius: 5 },
  submitText: { color: 'white', marginRight: 10 },
  error: { color: 'red', marginTop: 5 },
});
