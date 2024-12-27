// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import { useMapDetails } from '../contexts/MapDetails';

// const DISTANCE_THRESHOLD = 0.002; 

// const calculateDistance = (coord1, coord2) => {
//   const latDiff = coord1[0] - coord2[0];
//   const lonDiff = coord1[1] - coord2[1];
//   return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
// };

// const Geocoding = ({ markerPosition }) => {
//   const [inRangeArea, setInRangeArea] = useState(null);
//   const { points, municipals } = useMapDetails()
  


//   useEffect(() => {
//     try {
//       let foundArea = null;
//       points.forEach(area => {
//         const distance = calculateDistance(
//           [markerPosition.latitude, markerPosition.longitude],
//           area.coordinates
//         );
//         if (distance < DISTANCE_THRESHOLD) {
//           foundArea = area;
//         }
//       });
//       setInRangeArea(foundArea);
//     }catch(err) {
//       console.log("ERROR-geocoding: ", err);
      
//     }
//   }, [markerPosition]);

//   return (
//     <View style={{width: '100%'}}>
//         <View style={[{
//           height: 45,
//           width: '100%',
//           backgroundColor: '#fff',
//           alignItems: 'center',
//           borderRadius: 10,
//           marginBottom: 10,
//           flexDirection: 'row',
//           paddingLeft: 25,
//         },styles.card]}>
//           <View>
//             <Image source={require("../assets/images/Marker.png")} style={{width: 45, height: 45}}/>
//           </View>
//           <View style={{marginLeft: 10}}>
//             <Text style={{color: "#f4b446"}}> { inRangeArea ? `${inRangeArea.brgy}, ${inRangeArea.municipal} Catanduanes`:"Loading..." }</Text>
//             <Text style={{fontSize: 9, fontFamily: 'Poppins-Regular', marginLeft: 5}}>{ inRangeArea ? inRangeArea.near != null && `Near at${inRangeArea.near.name}`:"Loading..." }</Text>
//           </View>
          
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     shadowColor: '#00000098',
//     shadowOffset: { width: 0, height: 0},
//     shadowRadius: 40,
//     elevation: 5
//   }
// });

// export default Geocoding;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useMapDetails } from '../contexts/MapDetails';

const DISTANCE_THRESHOLD = 0.002; 

const calculateDistance = (coord1, coord2) => {
  const latDiff = coord1[0] - coord2[0];
  const lonDiff = coord1[1] - coord2[1];
  return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
};

const Geocoding = ({ markerPosition }) => {
  const [inRangeArea, setInRangeArea] = useState(null);
  const [lastInRangeArea, setLastInRangeArea] = useState(null);
  const { points, municipals } = useMapDetails();

  useEffect(() => {
    
    try {
      let foundArea = null;
      points.forEach(area => {
        const distance = calculateDistance(
          [markerPosition.latitude, markerPosition.longitude],
          area.coordinates
        );
        if (distance < DISTANCE_THRESHOLD) {
          foundArea = area;
        }
      });

      if (foundArea) {
        setInRangeArea(foundArea)
        setLastInRangeArea(foundArea)
        console.log("inRangeArea: ", inRangeArea);
      } else {
        setInRangeArea(null)
      }
    } catch(err) {
      console.log("ERROR-geocoding: ", err)
    }
  }, [markerPosition]);

  const displayArea = inRangeArea || lastInRangeArea; 
  console.log("displayArea: ", displayArea);

  return (
    <View style={{width: '100%'}}>
      <View style={[{
        height: 45,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        paddingLeft: 25,
      }, styles.card]}>
        <View>
          <Image source={require("../assets/images/Marker.png")} style={{width: 45, height: 45}}/>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{color: "#f4b446"}}>
            {displayArea ? `${displayArea.brgy}, ${displayArea.municipal} Catanduanes` : "Loading..."}
          </Text>
          <Text style={{fontSize: 9, fontFamily: 'Poppins-Regular', marginLeft: 5}}>
            {displayArea && displayArea.near ? `Near at ${displayArea.near.name}` : "Loading..."}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 4},
    shadowRadius: 20,
    elevation: 3
  }
});

export default Geocoding;
