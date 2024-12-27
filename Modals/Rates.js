import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FareContext } from '../contexts/FaresContext'
import { useContext, useEffect, useState } from 'react'
import DropdownMenu from '../components/Dropdown'
import { AuthContext } from '../contexts/AuthContext'
import Table from '../components/Table'
const Rates = () => {
  const { setDocumentIDS, matrix } = useContext(FareContext)
  const { port, originPort } = useContext(AuthContext)
  const [selected, setSelected] = useState()
  const matrixDes = matrix.filter( index => index.key == port)

  console.log('Matrix: ', matrixDes, 'port: ', port)
  return (
    <View style={[styles.container]}>
      <View style={[{marginHorizontal: 20, marginTop: 20 }]}>
        <Text style={[{fontSize: 29, fontFamily: 'Poppins-Regular', height: 43}]}>{ originPort }</Text>
        <Text style={[{fontSize: 14, fontFamily: 'Poppins-Regular', color: '#F4B446'}]}>Origin</Text>
      </View>
      <View style={{margin: 20}}>
        <View style={styles.inputBox}>
          <Text style={{  fontFamily: 'Poppins-Regular' }}>Destination</Text>
          <DropdownMenu setValue={setSelected} data={matrix.map( index => ({label: index.key, value: index.key}))} markerIcon="place" markerColor="#CE2029" placeholder="Select your Destination"/>
        </View>
        <View style={styles.inputBox}>
          <Text style={{  fontFamily: 'Poppins-Regular', fontSize: 15, marginTop: 15 }}>List of fare for 'viracPort'</Text>
          <Text style={{  fontFamily: 'Poppins-Regular', fontSize: 27, color: '#f4b446', marginBottom: 10 }}>Table list: </Text>
          <Table destinationPort = { selected } />
          
        </View>
      </View>
    </View>
  )
}

export default Rates

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        height: "100%",
    },
    inputBox: {
      marginVertical: 10
    }
})