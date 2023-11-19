import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Cross from './Cross';
const Cell = (props: any) => {
  const {cell, onPress} = props;
  return (
    <View>
      <Pressable
        onPress={() => onPress(props.rowIndex, props.columnIndex)}
        style={styles.cell}
        key={`row-${props.rowIndex}-col${props.columnIndex}`}>
        {cell === 'o' && <View style={styles.circle} />}
        {cell === 'x' && <Cross />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: 'red',
  },
  cell: {
    width: 80,
    height: 105,
    flex: 1,
  },
});

export default Cell;
