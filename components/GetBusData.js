import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'


const GetBusData = ({ docID, setBusData }) => {
    const [ conductorName, setConductorName ] = useState()
    const [ data, setData ] = useState([])
    useEffect(()=>{
        try {
            const collectioRef = collection(db, 'buses')
            const subs = onSnapshot(collectioRef, (snap) => {
                var D = []
                snap.forEach( doc => {
                    if(doc.id == docID) {
                        D.push({id: doc.id, ...doc.data()})
                    }
                })
                setData(D)
                setBusData(D)
            })
            return ()=> subs()
        }catch(err) {
            throw err
        }
    }, [])
  return (
    <View>
        
    </View>
  )
}

export default GetBusData