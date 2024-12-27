import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const { height } = Dimensions.get('window');

export default function AnimatedModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Starts from bottom of the screen
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initially transparent

  useEffect(() => {
    if (isModalVisible) {
      // Animate slide and fade in when modal is shown
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide from bottom to the center
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade in
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate slide and fade out when modal is hidden
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height, // Slide back to the bottom
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isModalVisible]);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <MaterialIcons name="calculate" size={33} color="#00000090" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="none" // Disable default animation
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <View style={styles.modalHeader}>
                <View style={styles.modalTitle}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Poppins-Regular',
                        marginLeft: 10,
                    }}>Fare calculator</Text>
                </View>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.buttonText}>
                        <MaterialIcons name="close" color="#000" size={20}/>
                    </Text>
                </TouchableOpacity>
            </View>
                
            
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    backgroundColor: '#F4B446',
    borderRadius: 50,
    position: 'absolute',
    bottom: 100,
    right: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 18,
    shadowOffset: { width: 1, height: 1},
    shadowColor: '#00000090',
    shadowRadius: 50,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginRight: 5
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    elevation: 5,
    height: '65%',
    width: "100%"
  },
  modalTitle: {
    flex: 1,
    justifyContent: 'center',
    height: "100%",
    minHeight: 50
  },
  closeButton: {
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 5,
    alignSelf: 'center',
  },
  modalHeader: {
    justifyContent: "center",
    flexDirection: 'row',
    marginTop: 15
  }
});
