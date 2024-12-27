import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState} from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'



export const ConductorsContext = createContext()


const ConductorsContextProvider = ({ children }) => {
    const [ AllConductor, setAllConductor ] = useState([])
    const [ myDriver, setMyDriver ] = useState('') 
    const [ myBus, setMyBus ] = useState('') 
    const [ objectData, setObjectData] = useState([])
    useEffect(()=> {
        try {
            const subs = onSnapshot(collection(db, 'credentials'), (snap) => {
                const data = []

                const objectD = []
                snap.forEach( docs => {
                    data.push(docs.data())
                    objectD.push({id: docs.id, bus_number: docs.data().bus_number})
                })
                setAllConductor(data)
            })
            return ()=>subs()
        }catch(err) {
            throw err
        }
    }, [])


  return (
    <ConductorsContext.Provider value={{AllConductor, setMyDriver, myDriver, myBus, setMyBus}}>
        { children }
    </ConductorsContext.Provider>
  )
}

export default ConductorsContextProvider