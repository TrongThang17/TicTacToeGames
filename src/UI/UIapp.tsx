import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Cell from '../components/Cell';
import logicApp from '../logic/logicApp';
import '../images/bg.png';

const UIapp = () => {
  const {currentTurn, map, onPress, gameMode, setGameMode, resetGame} =
    logicApp();
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/bg.png')} style={styles.bg}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            position: 'absolute',
            top: -50,
            fontWeight: 'bold',
          }}>
          Current Turn : {currentTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell
                  cell={cell}
                  onPress={() => onPress(rowIndex, columnIndex)}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.featurePlay}>
          <TouchableOpacity
            style={[
              styles.touchPlay,
              {
                backgroundColor: gameMode === 'Local' ? '#ed4051' : '#b9edc7',
              },
            ]}
            onPress={() => setGameMode('Local')}>
            <Text style={styles.textPlay}>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchPlay,
              {
                backgroundColor: gameMode === 'Easy' ? '#ed4051' : '#b9edc7',
              },
            ]}
            onPress={() => setGameMode('Easy')}>
            <Text style={styles.textPlay}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchPlay,
              {
                backgroundColor: gameMode === 'Medium' ? '#ed4051' : '#b9edc7',
              },
            ]}
            onPress={() => setGameMode('Medium')}>
            <Text style={styles.textPlay}>Medium</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={resetGame} style={styles.resetGame}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              top: 10,
              color: 'black',
            }}>
            Reset Game
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <StatusBar />
      <Text style={styles.dev}>Dev by Trọng Thắng</Text>
    </View>
  );
};

export default UIapp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '90%',
    aspectRatio: 1 / 1.05,
    marginBottom: 95,
  },
  resetGame: {
    backgroundColor: '#b9edc7',
    borderRadius: 19,
    width: 120,
    height: 50,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  featurePlay: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 50,
    justifyContent: 'center',
  },
  textPlay: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  touchPlay: {
    borderRadius: 10,
    backgroundColor: '#b9edc7',
    width: 100,
    margin: 10,
  },
  dev: {
    fontSize: 15,
    fontFamily: 'fantasy',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#87ada8',
    marginTop: 50,
  },
});
