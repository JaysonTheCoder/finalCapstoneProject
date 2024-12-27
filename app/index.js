import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommuterDrawerProvider from './navigators/Drawers/CommuterDrawer';
import OperatorHomescreen from '../Screens/OperatorHomescreen';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../contexts/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OperatorIDContextProvider } from '../contexts/OperatorIDContext';
import { PortsProvider } from '../contexts/PortsContext';
import { ActivityIndicator } from 'react-native-paper';
import OperatorDrawerProvider from './navigators/Drawers/OperatorDrawer';
import { FareContextProvider } from '../contexts/FaresContext';
// import { MapPointsContextProvider } from '../contexts/Mappoints';
import { MapDetailsContextProvider } from '../contexts/MapDetails';
import Record from '../Screens/Record';
import DriverSelection from '../Screens/DriverSelection';
import ConductorsContextProvider from '../contexts/getConductorsContext';
import DriversContextProvider from '../contexts/getDrivers';
import BusesContextProvider from '../contexts/getBuses';
import HomescreenOperator from '../Screens/OperatorHomescreen';
import { BusSetupContextProvider } from '../contexts/BusSetupContext';

export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator()

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'), 
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }
  return(
        <BusSetupContextProvider>
      <BusesContextProvider>
          <DriversContextProvider>
          <ConductorsContextProvider>
          <MapDetailsContextProvider>
        <FareContextProvider>
          <AuthProvider>
            <GestureHandlerRootView>
              <OperatorIDContextProvider>
                <PortsProvider>
                  <Stack.Navigator>
                    <Stack.Screen name='CommuterHomescreen' component={CommuterDrawerProvider} 
                        options={
                          { 
                            headerShown: false
                          }
                        }/>
                    <Stack.Screen name='records' options={{headerShown: true, headerStyle: { backgroundColor: '#F4B446'}, headerTitle: 'Record'}} component={ Record }/>
                    <Stack.Screen name='selection' options={{headerShown: false, headerStyle: { backgroundColor: '#F4B446'}, headerTitle: ''}} component={ DriverSelection }/>
                    <Stack.Screen name='OperatorHomescreen' options={{headerShown: false}} component={ HomescreenOperator }/>
                  </Stack.Navigator>
                </PortsProvider>
              </OperatorIDContextProvider>
            </GestureHandlerRootView>
          </AuthProvider>
        </FareContextProvider>
    </MapDetailsContextProvider>
    </ConductorsContextProvider>
    </DriversContextProvider>
    </BusesContextProvider>
  </BusSetupContextProvider>
  )
  
}