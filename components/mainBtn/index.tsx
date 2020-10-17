import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'


export default function MainBtn (props) {
    const {onPress, bgColor, txtColor, title, spaceTop } = props
  return (
    <TouchableOpacity onPress={onPress} 
                      style={[styles.mainBtn,{backgroundColor: bgColor, marginTop: spaceTop,}]}>
      <Text style={[styles.btnTxt,{color:txtColor}]}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    mainBtn: {
        alignSelf:'center',
        justifyContent: 'center', 
        width:'80%',
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: {
          height: 3,
          width: 6
        },
        height:60,
        borderRadius:25
      },
    
      btnTxt: {
        alignSelf:'center',
        fontSize:24,
        fontWeight:'600',
      } 
})






