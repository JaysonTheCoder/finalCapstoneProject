import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

const CustomDropdown = ({ data, selectedValue, onValueChange, placeholder, ...props }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    onValueChange(item);
    setDropdownVisible(false);
  };
  
  return (
    <View style={styles.container}>
      {/* Selected Value */}
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.selectedText}>
          {selectedValue || placeholder || 'Select an option'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleDropdown}
          activeOpacity={1}
        >
          <View style={styles.dropdownContainer}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 300,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedValueText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
