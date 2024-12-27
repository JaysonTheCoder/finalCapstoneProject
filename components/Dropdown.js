import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const DropdownMenu = ({ data, markerIcon, markerColor, placeholder, setValue }) => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedValue(value)
          setValue(value)
        }}
        items={data ? data:[
          { label: 'No data found', value: 'No data found' },
        ]}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: placeholder ? placeholder:'Select an item', 
          value: null, 
          color: 'gray', 
        }}
        value={selectedValue} 
        Icon={() => {
          return <MaterialIcons name={ markerIcon ? markerIcon:"search" } size={25} color={ markerColor ? markerColor:'gray'} />;
        }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10, // Adjust this to vertically center the icon
    right: 12,
    height: "100%",
  },
});
export default DropdownMenu;
