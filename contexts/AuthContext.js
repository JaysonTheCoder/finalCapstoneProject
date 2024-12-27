import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
export const AuthContext = createContext()

export const AuthProvider = function({ children }) {
    const [ id, setID ] = useState('')
    const [ conductorName, setConductorName ] = useState('')
    const [ bus_number, setBusNumber ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ port, setPort ] = useState('')
    
    const [ originPort, setOriginPort ] = useState('')
    const [ selectedRoute, setSelectedRoute ] = useState('')
    const [ selectedFromTo, setSelectedFromTo ] = useState({})
    const [ selectedToFrom, setSelectedToFrom ] = useState({})




    let value = {
        setID,
        setConductorName,
        setBusNumber,
        setStatus,
        setDestination,
        setPort,
        setOriginPort,
        setSelectedRoute,
        setSelectedFromTo,
        setSelectedToFrom,
        id,
        conductorName,
        bus_number,
        status,
        destination,
        port,
        originPort,
        selectedRoute,
        selectedFromTo,
        selectedToFrom
    }
    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}