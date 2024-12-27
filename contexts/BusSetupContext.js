import { View, Text } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'


export const BusSetupContext = createContext()

const BusSetupContextProvider = ({ children }) => {
    const [conductorName, setConductorName ] = useState('')
    const [busSetupFromToData, setBusSetupFromToData ] = useState({})
    const [busSetupToFromData, setBusSetupToFromData ] = useState({})
    const [ selectedPorts, setSelectedPorts ] = useState([])


  return (
    <BusSetupContext.Provider value={{ selectedPorts, setSelectedPorts, busSetupFromToData, setBusSetupFromToData, busSetupToFromData, setBusSetupToFromData}}>
      { children }
    </BusSetupContext.Provider>
  )
}

export { BusSetupContextProvider }