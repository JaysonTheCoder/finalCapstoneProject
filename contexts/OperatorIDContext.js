import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
export const OperatorIDContext = createContext()

export const OperatorIDContextProvider = function({ children }) {
    const [ initialID, setInitialID ] = useState('')
    return(
        <OperatorIDContext.Provider value={{initialID, setInitialID}}>
            { children }
        </OperatorIDContext.Provider>
    )
}
