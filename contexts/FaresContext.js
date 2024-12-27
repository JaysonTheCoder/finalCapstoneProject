import { createContext, useEffect, useState, useContext } from 'react'
import { db } from '../firebaseConfig'
import { onSnapshot, collection } from 'firebase/firestore'
export const FareContext = createContext()


export const FareContextProvider = function({ children }) {
    const [ matrix, setMatrix ] = useState([])
    const [ documentIDS, setDocumentIDS ] = useState()
    useEffect(()=> {
        try {
            const getData = onSnapshot(collection(db, 'farerate'), (snap)=> {
                    const data = snap.docs.map( index => ({
                        key: index.id,
                        ...index.data()
                    }))
                    setMatrix(data)
                })
            return ()=> getData();
        } catch(err) {
            console.error("Error getting fares: ", err)
        }
    }, [])
    
    return (
        <FareContext.Provider value={{ matrix, setDocumentIDS }}>
            { children }
        </FareContext.Provider>
    )
}