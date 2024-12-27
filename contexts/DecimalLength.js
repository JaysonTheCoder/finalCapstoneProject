import { createContext, Component, useState, useEffect } from "react";

const DecimalLengthContext = createContext()


export default DecimalLengthContextProvider = function({ children }) {
    const [ coords, setCoords ] = useState(null)
    const [ value, setValue ] = useState(null)
    const [ decimalLength, setLength ] = useState(0)

    useEffect(()=> {
        try {
            const getLength = async function(num) {
                const abs = await (num - Math.floor(num))
                const decimalPart = await ( parseFloat(abs.toFixed(10)) )
                const str = await ( decimalPart.toString() )
                await setLength(str.length - 2)
                return decimalLength
            }

            return getLength
        }catch(e) {
            throw e
        }
    }, [coords])


}