import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;