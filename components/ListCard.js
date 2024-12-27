import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { MaterialIcons } from '@expo/vector-icons';

const ListCard = ({ origin, destination, departure, cardType, cardIndex, docID, handleDepartureEdit, bus_number }) => {
  // const { isLoading } = useContext(LoadingContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newDeparture, setNewDeparture] = useState(departure);

  const handleSave = async () => {
    if (!newDeparture) {
      alert('Departure time cannot be empty');
      return;
    }

    // isLoading(true);
    const documentRef = doc(db, 'schedule', docID);

    try {
      await updateDoc(documentRef, {
        [`${cardType}.${cardIndex + 1}.departure`]: newDeparture,
      });

      setIsEditing(false);
      handleDepartureEdit(newDeparture);
      console.log('Departure updated successfully!');
    } catch (error) {
      console.error('Error updating departure:', error);
    } finally {
      // isLoading(false);
    }
  };

  return (
    <View style={styles.schedListItem}>
      <View style={styles.listItem}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Origin</Text>
          <Text style={styles.labelText}>Destination</Text>
          <Text style={styles.labelText}>Departure</Text>
        </View>

        <View style={styles.list}>
          <View style={styles.listIcon}>
            <MaterialIcons name="location-on" size={20} color="red" />
            <Text style={styles.listText}>{origin}</Text>
          </View>
          <View style={styles.listIcon}>
            <MaterialIcons name="gps-fixed" size={20} color="black" />
            <Text style={styles.listText}>{destination}</Text>
          </View>

          {isEditing ? (
            <View style={styles.editSection}>
              <TextInput
                style={styles.input}
                value={newDeparture}
                onChangeText={setNewDeparture}
                placeholder="Enter new departure time"
              />
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                style={[styles.cancelButton, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}
              >
                <MaterialIcons name="cancel" size={20} color="black" />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.status}>
              {bus_number && (
                <View style={styles.busOccupied}>
                  <Text style={styles.busNumberText}>{bus_number}</Text>
                </View>
              )}
              <View style={styles.listTimeDeparture}>
                <Text style={styles.departureText}>{departure}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                <MaterialIcons name="edit" size={16} color="white" />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  schedListItem: {
    padding: 9,
    backgroundColor: '#00000008',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'column',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 9,
    marginLeft: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  listText: {
    fontSize: 15,
    marginLeft: 10,
  },
  input: {
    paddingLeft: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#03212d',
    marginRight: 7,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#0a8650',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  busOccupied: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  busNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listTimeDeparture: {
    flex: 1,
  },
  departureText: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#1273c9',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f1f1f1',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ListCard;
