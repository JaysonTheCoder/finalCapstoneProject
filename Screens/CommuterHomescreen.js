import React, { useState, useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { PortsContext } from '../contexts/PortsContext';
import { useMapDetails } from '../contexts/MapDetails';
import Geocoding from '../components/Geocoding';
import LoadingScreen from '../components/LoadingScreen';
import { useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
const CommuterHomeScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [sanAndres, setSanAndres] = useState([]);
  const [cardDetailIndex, setCardDetailIndex] = useState(null);
  const [getCardDetails, setCardDetails] = useState([]);
  const [openCard, setOpenCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const userCollectionRef = collection(db, 'buses');

  const { points } = useMapDetails();
  const { TerminalPorts } = useContext(PortsContext);

  const [mapKey, setMapKey] = useState(0);
  const [mapViewRef, setMapViewRef] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
        const onlineUsers = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.active === true);
          
        setMarkers(onlineUsers);
        console.log("markers: ", onlineUsers);
        
        // setSanAndres(points.filter((point) => point.municipal === "San Andres"));
        setLoading(false);
      });

      setMapKey((prevKey) => prevKey + 1);

      return () => unsubscribe();
    }, [points])
  );

  useEffect(() => {
    if (cardDetailIndex !== null) {
      const cardData = markers.find((bus) => bus.id === cardDetailIndex);
      setCardDetails(cardData ? [cardData] : []);
    }
  }, [cardDetailIndex, markers]);
  

  const resetMapView = () => {
    if (mapViewRef) {
      mapViewRef.animateToRegion({
        latitude: 13.7876,
        longitude: 124.2374,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }, 1000); 
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingScreen />}

      <MapView
        key={mapKey}
        ref={(ref) => setMapViewRef(ref)}
        style={styles.map}
        initialRegion={{
          latitude: 13.7876,
          longitude: 124.2374,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onPress={() => setOpenCard(false)}
      >
        {markers.map(( value) => (
          <Marker
            key={value.id}
            coordinate={{
              latitude: value.coordinate.latitude,
              longitude: value.coordinate.longitude,
            }}
            onPress={() => {
              setOpenCard(true);
              setCardDetailIndex(value.id);
              
            }}
          >
            <Image source={require('../assets/images/Marker.png')} style={{ width: 55, height: 55 }} />
          </Marker>
        ))}
        {TerminalPorts && TerminalPorts.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            title={bus.id}
          >
            <Image source={require('../assets/images/Pin.png')} style={{ width: 55, height: 55 }} />
          </Marker>
        ))}
      </MapView>

      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <View style={styles.resetButton}>
        <MaterialIcons
          name="refresh"
          size={30}
          color="#fff"
          onPress={resetMapView}
        />
      </View>

      {openCard && getCardDetails.length > 0 && getCardDetails.map((bus) => (
  <View style={styles.display} key={bus.id}>
    <Geocoding markerPosition={{ latitude: bus.coordinate.latitude, longitude: bus.coordinate.longitude }} />
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>{bus.id}</Text>
        <Text style={{ fontSize: 12 }}>{ bus.conductorName}</Text>
      </View>
      <View style={styles.cardDetails}>
        <View style={{ flex: 1, maxHeight: '40%', paddingLeft: 20 }}>
          <Text style={{ fontSize: 17 }}>Destination</Text>
          <Text style={{ paddingLeft: 2 }}>{bus.destination ? `${bus.destination}, Catanduanes`:'Destination not found...'}</Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <Text style={{ fontSize: 17 }}>Estimated Time Arrival</Text>
          <Text style={{ paddingLeft: 2 }}>{bus.eta ? bus.eta:"ETA not found"}</Text>
        </View>
      </View>
    </View>
  </View>
))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  display: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    maxHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 5 },
    shadowRadius: 15,
  },
  header: {
    flex: 1,
    maxHeight: '30%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 5,
  },
  cardDetails: {
    flex: 1,
  },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommuterHomeScreen;