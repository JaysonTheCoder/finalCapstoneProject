import { createContext, useState } from "react";


export const MapPointsContext = createContext()


export const MapPointsContextProvider = function({ children }) {

    const [ points, setPoints ] = useState([])
    const [loading, setLoading] = useState(false)

    var limit = { lat: 13.507505, lon: 124.427978 };
    var startOn = { lat: 14.103868, lon: 124.028398 };

    var increment = { lat: -0.000100, lon: 0.000100 };

    var latLonArray = [{ 
        lat: parseFloat(startOn.lat.toFixed(6)), 
        lon: parseFloat(startOn.lon.toFixed(6)) 
    }];

    var currentPoint = { ...startOn };



    while (
        currentPoint.lat > limit.lat 
    ) {
        setLoading(true)
        currentPoint.lat += increment.lat;
        currentPoint.lon += increment.lon;
    
        if (currentPoint.lat <= limit.lat && currentPoint.lon >= limit.lon) {
            setPoints(latLonArray)
            setLoading(true)
            break;
        }
    
        latLonArray.push({ 
            lat: parseFloat(currentPoint.lat.toFixed(6)), 
            lon: parseFloat(currentPoint.lon.toFixed(6)) 
        });
    }


    return (
        <MapPointsContext.Provider value={ {points, setLoading, loading} }>
            { children }
        </MapPointsContext.Provider>

    )
}