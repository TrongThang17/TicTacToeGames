import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Cross = () => {
  return (
<View style={styles.cross}>
    <View style={styles.crossLine} />
    <View style={[styles.crossLine, styles.crossLineReverse]} />
</View>
  )
}


const styles = StyleSheet.create({
    crossLine:{
        position:'absolute',
        width:11,
        height:80,
        borderRadius:5,
        marginLeft:30,
        backgroundColor:'red',
        transform:[
          {
            rotate:'45deg',
          },
        ]
      },
      crossLineReverse:{
        transform:[
          {
            rotate:'-45deg',
          },
        ]
      },
      cross:{
        width:75,
        height:75,
        marginLeft:20,
        marginTop:20,
        
      }
})

export default Cross;