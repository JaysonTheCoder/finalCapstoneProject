import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState, useContext} from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export const BusesContext = createContext()


const BusesContextProvider = ({ children }) => {
    const [ AllBuses, setAllBuses ] = useState([])
    const [selectedB, setSelectedB ] = useState('')
    const [busID, setBusID ] = useState('')
    const [busPort, setBusPort ] = useState([])
    useEffect(()=> {
        try {
            const subs = onSnapshot(collection(db, 'buses'), (snap) => {
                const data = []
                snap.forEach( docs => {
                    data.push({id: docs.id, ...docs.data()})
                })
                
                setAllBuses(data)
            })
            return ()=>subs()
        }catch(err) {
            throw err
        }
    }, [])


  return (
    <BusesContext.Provider value={{AllBuses, setSelectedB, busPort, selectedB, setBusPort}}>
        { children }
    </BusesContext.Provider>
  )
}

export default BusesContextProvider 