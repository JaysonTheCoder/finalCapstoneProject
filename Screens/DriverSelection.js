import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable, Modal, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import CustomDropdown from '../components/DropdownRecord';
import LoadingScreen from '../components/LoadingScreen';
import { ConductorsContext } from '../contexts/getConductorsContext';
import { DriversContext } from '../contexts/getDrivers';
import { BusesContext } from '../contexts/getBuses';
import { PortsContext } from '../contexts/PortsContext';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { BusSetupContext } from '../contexts/BusSetupContext';
const DriverSelection = () => {
    const [loading, setLoading] = useState(false);
    const [ports, setPorts] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [buses, setBuses] = useState([]);
    const [routesOption, setRoutesOption] = useState([]);




    const [fromToData, setFromToData] = useState([]);
    const [toFromData, setToFromData] = useState([]);



    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedBus, setSelectedBus] = useState('');


    const [error, setError] = useState(''); // Error state to track validation errors
    const [modalVisible, setModalVisible] = useState(false);
    
  
    const { AllDrivers, setSelectedD } = useContext(DriversContext);

    const { setSelectedPorts, selectedPorts } = useContext(BusSetupContext);

    const { AllBuses, setSelectedB, selectedB } = useContext(BusesContext);
    const { TerminalPorts } = useContext(PortsContext);
    const { 
      id, 
      setOriginPort, 
      setDestination, 
      setSelectedRoute, 
      selectedRoute ,
      setSelectedFromTo,
      setSelectedToFrom,
      selectedFromTo,
      selectedToFrom
    } = useContext(AuthContext);
    const navigation = useNavigation();
  



    useEffect(() => {
      const initializeData = () => {
        setDrivers(AllDrivers.map(driver => driver.name));
        setBuses(AllBuses.map(bus => bus.id));
      };
      initializeData();
    }, [AllDrivers, AllBuses]);
  
    useEffect(() => {
      const fetchRoutes = () => {
        const collectionRef = collection(db, 'schedule');
        return onSnapshot(collectionRef, (snapshot) => {
          const routes = snapshot.docs.map(doc => doc.id);
          setRoutesOption(routes);
        });
      };
      fetchRoutes();
    }, []);
  

    const setNewSelectedPorts = async function(portId1, portId2) {
      try {
        const ports = []
        const docRef1 = doc(db, 'ports', portId1.toLowerCase()) 
        const docRef2 = doc(db, 'ports', portId2.toLowerCase()) 
        const data1 = await getDoc(docRef1)
        const data2 = await getDoc(docRef2)
        ports.push(data1.data().coordinate)
        ports.push(data2.data().coordinate)
        setSelectedPorts(ports)
      }catch(err) {
        console.log("errorrrrr: ", err);
        
      }
    }

    const fromToAndToFromdata = async function() {
      try {
        const docRef = doc(db, 'schedule', selectedRoute) 
        const data = await getDoc(docRef)
        setFromToData(Object.values(data.data().fromTo))
        setToFromData(Object.values(data.data().toFrom))
      }catch(err) {
        console.log("errorrrrr: ", err);
        
      }     
    }

    useEffect(()=> {
      try {
        if(selectedRoute) {
          var P = []
          console.log("innndexxx: ", selectedFromTo.index);
          
          setLoading(true)
          fromToAndToFromdata()
          setNewSelectedPorts(selectedFromTo.destination, selectedToFrom.destination)
          P.push(selectedFromTo.destination, selectedToFrom.destination)
          setDestination(P)
          console.log("selected-ini: ", selectedPorts);
          
          setLoading(false)
        }
      }catch(err) {
        console.log("errrrrrrr: ", err);
        setLoading(false)
        
      }
    }, [modalVisible])

 
    const handleSubmit = async () => {
      // Reset any previous error state
      setError('');
        setSelectedB(selectedBus)
        
      // Validate inputs
      if (!selectedDriver || !selectedBus || !selectedRoute || !selectedFromTo || !selectedToFrom) {
        setError('Please fill in all the fields');
        return; // Exit the function if any field is empty
      }
  
      setLoading(true);
      try {
        console.log("result: ", selectedPorts);
        
        const userRef = doc(db, 'credentials', id);
        const docRef = doc(db, 'schedule', selectedRoute)
        
        await updateDoc(userRef, {
          port: selectedRoute,
          driver: selectedDriver,
          bus_number: selectedBus,
        });
  
        // Save fromToData and toFromData to the bus document
        const busRef = doc(db, 'buses', selectedBus);
        await updateDoc(busRef, {
          fromTo: selectedFromTo,
          toFrom: selectedToFrom,
          conductorName: selectedDriver
        });

        await updateDoc(docRef, {
          [`fromTo.${selectedFromTo.index}`]: {
            bus: `${selectedB}`,
            destination: selectedFromTo.destination,
            origin: selectedFromTo.origin,
            departure: selectedFromTo.departure
          },
          [`toFrom.${selectedToFrom.index}`]: {
            bus: `${selectedB}`,
            destination: selectedToFrom.destination,
            origin: selectedToFrom.origin,
            departure: selectedToFrom.departure
          }
        })


        setSelectedD(selectedDriver)
        navigation.replace('OperatorHomescreen');
      } catch (error) {
        console.error('Error updating document:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
  
    // Clear error when selections are made
    const handleSelectionChange = () => {
      if (selectedDriver && selectedBus && selectedRoute && selectedFromTo && selectedToFrom) {
        setError(''); // Clear error once all fields are selected
      }
    };
  
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        {loading && <LoadingScreen />}
  
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bus Setup</Text>
        </View>
  
        <View style={styles.contentContainer}>
          <CustomDropdown
            placeholder="Select Driver"
            data={drivers}
            selectedValue={selectedDriver}
            onValueChange={(value) => {
              setSelectedDriver(value);
              handleSelectionChange();
            }}
          />
          <CustomDropdown
            placeholder="Select Bus"
            data={buses}
            selectedValue={selectedBus}
            onValueChange={(value) => {
              setSelectedBus(value);
              handleSelectionChange();
            }}
          />
          <CustomDropdown
            placeholder="Select Route"
            data={routesOption}
            selectedValue={selectedRoute}
            onValueChange={(value) => {
              setSelectedRoute(value);
              handleSelectionChange();
            }}
          />
  
          <Pressable style={styles.modalButton} onPress={() => {
            if (!selectedDriver || !selectedBus || !selectedRoute) {
              setError('Please fill in all the fields before selecting the destination');
            } else {
              setModalVisible(true);
            }
          }}>
            <Text style={styles.modalButtonText}>Select Destination</Text>
          </Pressable>
  
          <View style={styles.selectedDetailsContainer}>
            {selectedFromTo && <Text>From-To: {selectedFromTo.origin} → {selectedFromTo.destination}</Text>}
            {selectedToFrom && <Text>To-From: {selectedToFrom.origin} → {selectedToFrom.destination}</Text>}
          </View>
  
          {/* Display error message if there is one */}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
  
        <View style={styles.footerContainer}>
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('CommuterHomescreen')}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>
  
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedRoute}</Text>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>From-to</Text>
                  {fromToData.map((item, index) => (
                    <Pressable
                      key={`fromTo-${index}`}
                      onPress={() => {
                        setSelectedFromTo({ index: index, ...item});
                        setSelectedToFrom({ index: index, ...toFromData[index] });
                        setError(''); // Clear error once a destination is selected
                        setModalVisible(false)
                      }}
                      style={({ pressed }) => [
                        styles.modalItem,
                        pressed && { backgroundColor: '#ddd' },
                      ]}
                    >
                      <Text>{item.origin} → {item.destination}</Text>
                    </Pressable>
                  ))}
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>To-From</Text>
                  {toFromData.map((item, index) => (
                    <Pressable
                      key={`toFrom-${index}`}
                      onPress={() => {
                        setSelectedToFrom({ index: index, ...item});
                        setSelectedFromTo({ index: index, ...toFromData[index]});
                        setError(''); // Clear error once a destination is selected
                        setModalVisible(false)
                      }}
                      style={({ pressed }) => [
                        styles.modalItem,
                        pressed && { backgroundColor: '#ddd' },
                      ]}
                    >
                      <Text>{item.origin} → {item.destination}</Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    modalButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      borderRadius: 5,
    },
    modalButtonText: {
      fontSize: 16,
    },
    selectedDetailsContainer: {
      marginTop: 20,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    submitButton: {
      flex: 1,
      padding: 15,
      backgroundColor: '#0fb37a',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    submitButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    backButton: {
      flex: 0.5,
      padding: 15,
      backgroundColor: '#ccc',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    backButtonText: {
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalItem: {
      padding: 10,
      backgroundColor: '#f4f4f4',
      marginBottom: 10,
      borderRadius: 5,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#0fb37a',
      alignItems: 'center',
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 10,
    },
  });
  
  export default DriverSelection;
  