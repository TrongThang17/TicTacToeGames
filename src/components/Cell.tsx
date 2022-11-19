import { View, StyleSheet ,Pressable} from 'react-native'
import React from 'react'
import Cross from './Cross';
const Cell = (props:any) => {
    const {cell , onPress} = props;
  return (
    <Pressable 
        onPress={()=>onPress(props.rowIndex,props.columnIndex)} 
        style={styles.cell}
        key={`row-${props.rowIndex}-col${props.columnIndex}`}
    >
        {cell === 'o' && <View style={styles.circle} />}
        {cell === 'x' && <Cross />}
                
    </Pressable>
  )
}

const styles = StyleSheet.create({
    circle:{
        position:'absolute',
        width:70,
        height:70,
        backgroundColor:'white',
        borderRadius:50,
        marginTop:25,
        marginLeft:20,
        marginBottom:40,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:10,
        borderColor:'red'
        
      },
      cell:{
        width:100,
        height:125,
        flex:1,
      },
})

export default Cell