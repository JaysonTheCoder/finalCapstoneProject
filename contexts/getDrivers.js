import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState} from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'



export const DriversContext = createContext()


const DriversContextProvider = ({ children }) => {
    const [ AllDrivers, setAllDrivers ] = useState([])
    const [ selectedD, setSelectedD ] = useState([])
    const [ id, setId ] = useState('')


    useEffect(()=> {
        try {
            const subs = onSnapshot(collection(db, 'drivers'), (snap) => {
                const data = []
                snap.forEach( docs => {
                    data.push(docs.data())
                    if(selectedD && selectedD == docs.id) {
                        setId(docs.id)
                    }
                })
                setAllDrivers(data)
            })
            return ()=>subs()
        }catch(err) {
            throw err
        }
    }, [selectedD])


  return (
    <DriversContext.Provider value={{AllDrivers, setSelectedD, id, selectedD}}>
        { children }
    </DriversContext.Provider>
  )
}

export default DriversContextProvider