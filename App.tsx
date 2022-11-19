import React,{useState,useEffect} from "react";
import {Pressable,View, Image, ImageBackground, Text, StyleSheet, StatusBar, Alert, Button, TouchableOpacity} from 'react-native'
import  './src/images/bg.png'
import Cell from "./src/components/Cell";
const emptyMap = [
  ['','',''],//1st row
  ['','',''],//2nd row
  ['','',''], //3rd row
]

const copyArray = (original:any) =>{
  const copy= original.map((arr:any) =>{
    return arr.slice();
  });
  return copy;
}

export default function App(){
  const [map,setMap]= useState(emptyMap);
  const [currentTurn, setCurrenTurn] = useState('x');
  const [gameMode,setGameMode] = useState('Medium'); // have local, BOT_EASY and BOT_MEDIUM


  useEffect(() => {
    if(currentTurn === 'o' && gameMode !== "Local"){
      botTurn();
    }
  },[currentTurn,gameMode])

  useEffect(() =>{
    const winner = getWinner(map);
    if(winner){
      gameWon(winner)
    }else{
      checkTieState();
    }
  },[map])

  const onPress=(rowIndex:any,columnIndex:any) =>{
    if (map[rowIndex][columnIndex] !== ""){
      Alert.alert('position already occupied');
     
      return;
    } 

    setMap((existingMap:any) => {
      const updateMap = [...existingMap];
      updateMap[rowIndex][columnIndex] = currentTurn;
      return updateMap;
    });

    setCurrenTurn(currentTurn === 'x' ? 'o' : 'x')

   
    
   
  };

  const getWinner = (winnerMap:any) =>{
    //check row
    for(let i=0;i<3;i++){
      const isRowXWinning = winnerMap[i].every((cell:any) => cell === 'x') ;
      const isRowOWinning = winnerMap[i].every((cell:any) => cell === 'o');
      if(isRowXWinning){
       return 'x';
      }if(isRowOWinning) {
        return 'o';
      }
    }

    //check columb
    try{
      for(let col = 0; col<3 ;col++ ){
        let isColumnXWinner = true;
        let isColumnOWinner = true;
        
        for(let row = 0 ;row<3;row++){
          if(winnerMap[row][col] !== 'x'){
            isColumnXWinner = false;
          }
  
          if(winnerMap[row][col] !== 'o'){
            isColumnOWinner = false;
          }
        }
  
        if(isColumnXWinner){
          return 'x';
          break;
        }
  
        if(isColumnOWinner){
          return 'o';
          break;
        }
        
        
      }
    }catch(e){
      console.log(e)
    }


    //check diagonals
    let isDiagonal1OWinning = true
    let isDiagonal1XWinning = true
    let isDiagonal2OWinning = true
    let isDiagonal2XWinning = true
    for(let i=0;i<3;i++){
      if(winnerMap[i][i] !== 'o'){
        isDiagonal1OWinning= false;
      }
      if(winnerMap[i][i] !== 'x'){
        isDiagonal1XWinning= false;
      }
      if(winnerMap[i][2-i] !== 'o'){
        isDiagonal2OWinning= false;
      }
      if(winnerMap[i][2-i] !== 'x'){
        isDiagonal2XWinning= false;
      }
    }

    if(isDiagonal1OWinning || isDiagonal2OWinning){
      return 'o';
      
    }
    if(isDiagonal1XWinning || isDiagonal2XWinning){
      return 'x';
    }
  }

const checkTieState =() =>{
  if(!map.some(row => row.some(cell => cell === ''))){
    Alert.alert(`It's a tie`,`Tie` , [{
      text:'Restart',
      onPress:resetGame
    }])
  }
}

  const gameWon = (player:any) =>{
    Alert.alert(`Huraaay`,`Player ${player} won` , [{
      text:'Restart',
      onPress:resetGame
    }])
  }

  const resetGame = () =>{
    setMap([
      ['','',''],//1st row
      ['','',''],//2nd row
      ['','',''], //3rd row
    ]);
    setCurrenTurn('x');
  }

  const botTurn = () => {
    //Sưu tập tất cả các lựa chọn
    const possiblePositions: any[] = [] ;
    
    map.forEach((row,rowIndex) => {
      row.forEach((cell,columnIndex) => {
        if(cell === "") {
          possiblePositions.push({row:rowIndex, col:columnIndex})
        }
      });
    });

    let chosenOption;
    if (gameMode === "Medium"){
       //Attack
    possiblePositions.forEach(possiblePosition =>{
      const mapCopy = copyArray(map);
      mapCopy[possiblePosition.row][possiblePosition.col] = 'o';
      const winner = getWinner(mapCopy);

      if(winner === 'o'){
        // attack that position
        chosenOption = possiblePosition;
      }
    })

    if(!chosenOption){
      possiblePositions.forEach(possiblePosition =>{
        const mapCopy = copyArray(map);
        mapCopy[possiblePosition.row][possiblePosition.col] = 'x';
        const winner = getWinner(mapCopy);
  
        if(winner === 'x'){
          // defend that position
          chosenOption = possiblePosition;
        }
      })
    }
  }


    if(!chosenOption){
      chosenOption = 
            possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
    } 
    if(chosenOption){
      onPress(chosenOption.row,chosenOption.col);
    }
    
   
   
  }
  return(
    <View style={styles.container}>
      
      <ImageBackground 
        source={require('./src/images/bg.png')} 
        style={styles.bg}
      >
        <Text style={styles.dev}>DEV: Trọng Thắng</Text>
        <Text 
            style={{
                fontSize:30,
                color:"black",
                position:'absolute',
                top:-50,
                fontWeight:'bold'
              }}
            >
            Current Turn : {currentTurn.toUpperCase()}
          </Text>
        <View style={styles.map}>
          {map.map((row,rowIndex) =>(
            <View style={styles.row}>
              {row.map((cell,columnIndex)=>(
                <Cell cell={cell} onPress={()=>onPress(rowIndex,columnIndex)}/>
              ))}
            </View>
          ))}
        </View> 
        <View style={styles.featurePlay}>
          <TouchableOpacity style={[styles.touchPlay,{
            backgroundColor: gameMode === "Local" ? "#ed4051" : "#b9edc7"
          }]}
            onPress={()=> setGameMode('Local')}
          >
            <Text style={styles.textPlay}>Local</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchPlay,{
              backgroundColor: gameMode === "Easy" ? "#ed4051" : "#b9edc7"
          }]}
            onPress={()=> setGameMode('Easy')}  
          >
            <Text style={styles.textPlay}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchPlay,{
              backgroundColor: gameMode === "Medium" ? "#ed4051" : "#b9edc7"
          }]}
          onPress={()=> setGameMode('Medium')}
          >
            <Text style={styles.textPlay}>Medium</Text>
          </TouchableOpacity>
         
         
          
        </View>
        <TouchableOpacity onPress={resetGame} style={styles.resetGame}>
          <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',top:10,color:'black'}}>Reset Game</Text>
        </TouchableOpacity>  
        
      </ImageBackground>
      <StatusBar />
    </View>
  ) 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  },
  bg:{
    height:'70%',
    width:'100%',
    alignItems:"center",
    justifyContent:"center"
  },
  map:{
    width:'90%',
    aspectRatio:1/1.05,
    marginBottom:120
  },
  resetGame:{
    backgroundColor:'#b9edc7',
    borderRadius:19,
    width:120,
    height:50,
  },
 
  
  row:{
    flex:1,
    flexDirection:'row',
  },
  featurePlay:{
    position:'absolute',
    flexDirection:'row',
    bottom:50,
    justifyContent:'center'
  },
  textPlay:{
    color:'black',
    fontSize:20,
    textAlign:'center'

  },
  touchPlay:{
    borderRadius:10,
    backgroundColor:'#b9edc7',
    width:100,
    margin:10,
    
  },
  dev:{
    fontSize:15,
    fontFamily:'fantasy',
    fontWeight:'bold',
    textAlign:'center',
    
    color:'#87ada8'
  }
 
})