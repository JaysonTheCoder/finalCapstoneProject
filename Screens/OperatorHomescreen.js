import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, Pressable } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { doc, GeoPoint, onSnapshot, updateDoc, collection, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../contexts/AuthContext';
import { signOut, getAuth } from 'firebase/auth';
import ModalMessage from '../components/Modal';
import { useNavigation } from '@react-navigation/native';
import { OperatorIDContext } from '../contexts/OperatorIDContext';
import { PortsContext } from '../contexts/PortsContext';
import haversine from 'haversine';
import { useMapDetails } from '../contexts/MapDetails';
import { MaterialIcons } from '@expo/vector-icons';
import Geocoding from '../components/Geocoding';
import Record from './Record';
import { DriversContext } from '../contexts/getDrivers';
import { BusesContext } from '../contexts/getBuses';
import GetBusData from '../components/GetBusData';
import { BusSetupContext } from '../contexts/BusSetupContext';
import LoadingScreen from '../components/LoadingScreen';



const HomescreenOperator = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isFocused = useIsFocused()
  const { id, destination, setDestination, selectedRoute } = useContext(AuthContext)
  const [ openModal, setOpenModal ] = useState(false)
  const auth = getAuth()
  const navigation = useNavigation()
  const [ eta, setETA] = useState('Calculating...');
  const { points } = useMapDetails()
  const { selectedB, busPort } = useContext(BusesContext)
  const { selectedD } = useContext(DriversContext)
  const { selectedPorts, setSelectedPorts, selectedFromTo, selectedToFrom } = useContext(BusSetupContext)

  
  const [ isLoading, setisLoading ] = useState(false)

  const [locationSubscription, setLocationSubscription] = useState(null);


  const [ prevPos, setPrevPos ] = useState('')
  const [ ports, setPorts ] = useState([])


  const [ busData, setbusData ] = useState([])

  const rangeInDegrees = 0.01; 
  const radiusInMeters = rangeInDegrees * 50500; 
    



  const haversineDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; 
    const lat1 = toRad(coord1.latitude);
    const lon1 = toRad(coord1.longitude);
    const lat2 = toRad(coord2.latitude);
    const lon2 = toRad(coord2.longitude);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in kilometers
  };
  
  const areMarkersClose = (marker1, marker2, thresholdInKm) => {
    const distance = haversineDistance(marker1, marker2);
    return distance <= thresholdInKm;
  };
  
  
  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      

      // console.log("selected-port-: ", selectedPorts);
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      

      const credentialsDoc = await getDoc(doc(db, 'credentials', id)); 

      console.log("Portn: ", selectedPorts);

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1,
        },
        async (newLocation) => {
          const coords = newLocation.coords;
          setLocation(coords);
          // console.log(location);
          
          if (selectedB) {
            saveLocationToFirestore(coords, credentialsDoc.data());
          }
  
          try {
            
            const distance = haversine(coords, selectedPorts[0], { unit: 'meter' });
            if(areMarkersClose(newLocation.coords, selectedPorts[0], 4)) {
              const updatedCoordinates = [...selectedPorts];
              const [firstCoordinate] = updatedCoordinates.splice(0, 1);


              const updatedDestination = [...destination]
              const [firstDestination] = updatedDestination.splice(0, 1)
              
              updatedCoordinates.push(firstCoordinate);
              updatedDestination.push(firstDestination)
              
              setSelectedPorts(updatedCoordinates);
              setDestination(updatedDestination)

            
            }
            console.log("disatnat: ", distance);
            
            if(coords.speed > 0) {
              const etaMinutes = calculateETA(distance, coords.speed);
              console.log("destination: ", selectedPorts[0]);
              
              setETA(`${etaMinutes}`);
            }
            
          } catch (err) {
            console.error("ETA calculation error:", err);
            setETA("Error calculating ETA");
          }
        }
      );
  
      setLocationSubscription(subscription);
    };
  
    getLocationPermission();
  
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [selectedPorts]);
  


  const saveLocationToFirestore = async (coords, data) => {
    try {

      if(!data) {
        return
      }
      const busRef = doc(db, 'buses', data.bus_number); 
  
      await updateDoc(busRef, {
        coordinate: new GeoPoint(coords.latitude, coords.longitude),
        speed: coords.speed || 0,
        eta: eta,
        destination: destination[0]
      });
  
      // console.log('Location updated in Firestore');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };
  
  const calculateETA = (distance, speed) => {
    if (speed <= 0) return "0 minutes";
  
    const totalMinutes = distance / speed / 60; 
    const days = Math.floor(totalMinutes / 1440); 
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.floor(totalMinutes % 60);
  
      return `${days <= 0 ? days:'0'}d ${hours <= 0 ? hours:'0'}h ${minutes ? minutes:'0'}m`
    
  };
  
  const handleSignOut = async function() {
    try {
      
      const docRef = doc(db, 'schedule', selectedRoute)
      await updateDoc(docRef, {
        [`fromTo.${selectedFromTo.index}`]: {
          bus: '',
        },
        [`toFrom.${selectedToFrom.index}`]: {
          bus: '',
          destination: selectedToFrom.destination,
          origin: selectedToFrom.origin,
          departure: selectedToFrom.departure
        }
      })
      
      await signOut(auth)
      await navigation.replace('CommuterHomescreen')
      console.log("user signed out")
      
    }catch(err) {
      console.log("error: ", err)
    }
}

  const handleModalClose = function() {
    setOpenModal(false)
  }
  const handleOpen = function() {
    setOpenModal(true)
  }

  const handleRecordModalOpen = function() {
    navigation.navigate('records')
  }
  if (!location) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000'/>
      {
        isLoading && <LoadingScreen />
      }
      <ModalMessage confirm={()=> handleSignOut() } close={handleModalClose} open={openModal}  title="Confirm logout" message="Are you sure you want to logout?"/>

          <MapView
              style={styles.map}
              initialRegion={{
                latitude: 13.6184232,
                longitude: 124.0756445,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <Marker 
                draggable
                onDragEnd={(event) => {
                  const newCoordinate = event.nativeEvent.coordinate;
                  // console.log('New marker position:', newCoordinate);
              
                  saveLocationToFirestore(newCoordinate)
                }}
              
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              >
                <Image style={{height: 55, width: 55}} source={require('../assets/images/Marker.png')}/>
              </Marker>
              {
                
                selectedPorts.length > 0 ? (
                  <View>
                      <Marker coordinate={{ latitude: selectedPorts[0].latitude, longitude: selectedPorts[0].longitude}}>
                        <Image style={{height: 55, width: 55}} source={require('../assets/images/Pin.png')}/>
                      </Marker>
                    </View>
                ):null
              }

            
            </MapView>
            <View style={styles.info}>
              <Pressable onPress={()=> handleRecordModalOpen() } style={styles.recordButton}>
                <MaterialIcons style={{borderColor: 'red'}} name="add-chart" size={20} color="#fff" />
                <Text style={{color: '#fff'}}>Revenue and expenses</Text>
              </Pressable>

              <Geocoding markerPosition={location}/>

              <View style={[{
                height: 50,
                width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 10,
                flexDirection: 'row',
                paddingLeft: 25,
              },styles.card]}>
                      {/* <Text>Current Speed: {currentSpeed ? currentSpeed : 'Calculating...'} m/s</Text> */}
                      <Text style={{fontSize: 16, color: "#f4b446", fontFamily: 'Poppins-Regular'}}>Estimated Time Arrival </Text>
                      <Text style={{fontFamily: 'Poppins-Regular'}}>{eta !== 'Calculating...'&& `${eta}`}</Text>
                
              </View>
              <View style={[{
                height: 80,
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }, styles.card]}>
                  <View style={[{width: '90%', height: '90%', alignItems: 'center', flexDirection: 'row', position: 'relative'}]}>
                    <Image source={require('../assets/images/random42-logo.png')} style={{width: 50, height: 50, borderRadius: 50}}/>
                    <View style={{ marginLeft: 15}}>
                      <Text style={{color: '#F4B446', fontFamily: 'Poppins-Regular', fontSize: 20}}>{ selectedB ? selectedB:'Unavailable' } <Text style={{color: '#000', fontSize: 13}}>Operator.</Text></Text>
                      <Text style={{fontSize: 11, color: '#00000090'}}>{  selectedD ? selectedD:'Default N.' }</Text>
                    </View>
                    <View style={{position: 'absolute', width: '20%', right: 0, height: '70%', alignItems: 'center', justifyContent: 'center'}}>
                        <Pressable style={{color: '#F4B446', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={()=> handleOpen() }>
                          <MaterialIcons name='logout' size={24} color="#0008"/>
                        </Pressable>
                    </View>
                  </View>
              </View>
              <View style={[{
                height: 130,
                width: '100%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
              }, styles.card]}>
                <View style={{
                  width: '90%',
                  height: '70%',
                  justifyContent: 'center',
                }}>
                  { selectedPorts.length > 0 && <Text>Destination: { destination[0] }, Catanduanes</Text>}
                </View>
              </View>
          </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: "100%",
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  navbar: {
    height: 150,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    width: '98%'
  },
  navbarContent: {
    width: '98%',
    height: '90%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: "center"
  },
  nav: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 30,
    borderWidth: 1
  },
  info: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    alignItems: 'center', 
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: '#000'
  },
  card: {
    shadowColor: '#00000098',
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 40,
    elevation: 5
  },
  recordButton: {
    backgroundColor: '#043f23',
    alignSelf: 'flex-end',
    margin: 10,
    width: '43%',
    borderRadius: 15,
    borderWidth: 1,
    display: 'flex',
    flexDirection: "row",
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
    gap: 5
  }
});

export default HomescreenOperator;


