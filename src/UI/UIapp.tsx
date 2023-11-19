import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Cell from '../components/Cell';
import logicApp from '../logic/logicApp';
import '../images/bg.png';
import CountDown from 'react-native-countdown-component';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
const UIapp = () => {
  const {
    currentTurn,
    map,
    onPress,
    gameMode,
    setGameMode,
    resetGame,
    getWinner,
  } = logicApp();

  const [isShowCountDown, setIsShowCountDown] = useState(false);
  const [countDownTimerStart, setCountDownTimerStart] = useState(3);
  const [countDownTimerPlay, setCountDownTimerPlay] = useState<number>(10);
  const [isShowCountDownTimerPlay, setIsShowCountDownTimerPlay] =
    useState(false);
  const [isStart, setIsStart] = useState(false);
  const onStartGame = useCallback(() => {
    setIsShowCountDown(true);
  }, []);

  useEffect(() => {
    if (isShowCountDown) {
      if (countDownTimerStart !== 0) {
        setTimeout(() => {
          setCountDownTimerStart(countDownTimerStart - 1);
        }, 1000);
      }
      if (countDownTimerStart === 0) {
        setIsShowCountDown(false);
        setIsShowCountDownTimerPlay(true);
        setIsStart(true);
      }
    }
  }, [countDownTimerStart, isShowCountDown]);

  // useEffect(() => {
  //   if (isShowCountDownTimerPlay) {
  //     const timeOut = setTimeout(() => {
  //       setCountDownTimerPlay((prev?: any) => --prev);
  //       console.log(countDownTimerPlay);
  //       console.log(countDownTimerPlay);
  //     }, 1000);
  //     if (currentTurn !== 'x') {
  //       setCountDownTimerPlay(10);
  //       console.log('currnt ', currentTurn);
  //       return () => clearTimeout(timeOut);
  //     }

  //     if (countDownTimerPlay == 0) {
  //       setIsShowCountDownTimerPlay(false);
  //       setCountDownTimerPlay(10);
  //       return () => clearTimeout(timeOut);
  //     }
  //   }
  // }, [countDownTimerPlay, currentTurn, isShowCountDownTimerPlay]);

  // const onPressSqare = () => {
  //   const interval = setInterval(() => {
  //     setCountDownTimerPlay(currentCount => --currentCount);
  //   }, 1000);
  //   //execute your function
  //   if (countDownTimerPlay === 0) {
  //     getWinner(map);
  //   }

  //   // cleanup
  //   return () => clearInterval(interval);
  // };

  const onResetGame = useCallback(() => {
    setIsShowCountDown(false);
    setCountDownTimerStart(3);
    setCountDownTimerPlay(10);
    setIsStart(false);
  }, []);

  useEffect(() => {
    if (isShowCountDownTimerPlay && countDownTimerPlay === 0) {
      Alert.alert('Huraaay', `Player ${currentTurn} lose`, [
        {
          text: 'Restart',
          onPress: resetGame,
        },
      ]);
    }
  }, [countDownTimerPlay, currentTurn, isShowCountDownTimerPlay, resetGame]);

  console.log(isStart);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Current Turn : {currentTurn.toUpperCase()}
        </Text>
      </View>
      <View style={{flex: 3}}>
        <ImageBackground
          source={require('../images/table.png')}
          style={styles.bg}>
          {isStart ? (
            <>
              {map.map((row, rowIndex) => (
                <View style={styles.row}>
                  {row.map((cell, columnIndex) => (
                    <Cell
                      cell={cell}
                      onPress={() => {
                        onPress(rowIndex, columnIndex);
                      }}
                    />
                  ))}
                </View>
              ))}
            </>
          ) : (
            <View />
          )}
        </ImageBackground>
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
          <Text style={styles.textPlay}>Hard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottomBar}>
        <TouchableOpacity onPress={onStartGame} style={styles.startGame}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              top: 10,
              color: 'black',
            }}>
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetGame();
            onResetGame();
          }}
          style={styles.resetGame}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              top: 10,
              color: 'black',
            }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      {isShowCountDown ? (
        <View style={styles.containerCountDown}>
          <Text style={styles.textCountDownStart}>{countDownTimerStart}</Text>
        </View>
      ) : (
        <View />
      )}
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
    height: '100%',
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
  startGame: {
    backgroundColor: '#b9edc7',
    borderRadius: 19,
    width: 120,
    height: 50,
    marginRight: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  featurePlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textPlay: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  touchPlay: {
    borderRadius: 10,
    backgroundColor: '#b9edc7',
    width: 110,
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
  containerBottomBar: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  containerTimer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 84,
    backgroundColor: 'pink',
    top: -30,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCountDown: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 260,
    left: 170,
  },
  textCountDownStart: {
    fontSize: 94,
    fontWeight: '700',
    color: 'pink',
  },
  textCountDownPlay: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
});
