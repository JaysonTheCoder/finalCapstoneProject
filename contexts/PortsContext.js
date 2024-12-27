
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const PortsContext = createContext();

export const PortsProvider = ({ children }) => {
    const [newPosition, setNewPosition] = useState(null);
    const [TerminalPorts, setTerminalPort] = useState([]);
    const [portSelected, setPortSelected] = useState('');

    useEffect(() => {
        const collectionRef = collection(db, "ports");
        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
            const updatedMarkers = []
            querySnapshot.forEach((doc) => {
                updatedMarkers.push({
                    id: doc.id,
                    latitude: doc.data().coordinate.latitude,
                    longitude: doc.data().coordinate.longitude,
                
                })
            });
            setTerminalPort(updatedMarkers);    
        });

        return () => unsubscribe();
    }, [portSelected]);

    useEffect(() => {
        console.log("Updated TerminalPorts: ", TerminalPorts);
    }, [TerminalPorts]);

    return (
        <PortsContext.Provider value={{ TerminalPorts, setNewPosition, setPortSelected, portSelected }}>
            {children}
        </PortsContext.Provider>
    );
};
