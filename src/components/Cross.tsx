import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.crossLineReverse]} />
    </View>
  );
};

const styles = StyleSheet.create({
  crossLine: {
    position: 'absolute',
    width: 11,
    height: 40,
    borderRadius: 5,
    marginLeft: 30,
    backgroundColor: 'red',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  crossLineReverse: {
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  cross: {
    width: 35,
    height: 35,
    marginLeft: 0,
    marginTop: 23,
  },
});

export default Cross;
