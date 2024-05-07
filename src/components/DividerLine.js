import React from 'react';
import { View, StyleSheet } from 'react-native';
import styles from './styles';

const DividerLine = ({ vertical = false, style = {}, color='#E2D0C1' }) => {
    const lineStyle = vertical ? styles.lineVertical : styles.lineHorizontal;
    const combinedStyle = StyleSheet.flatten([lineStyle, style, {backgroundColor:color}]); // Merges default style with custom style
    return <View style={combinedStyle} />;
  };

export default DividerLine;