import React from 'react'
import { View, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'


export default function MainView(props) {
    const {...otherProps } = props

    //const originalImg = require('../../assets/images/originalBg.png')
    
    return (
      <View style={styles.container} >
        <ImageBackground style={styles.bgImg} source={require('../../assets/images/mainBg.png')}>
            <SafeAreaView  {...otherProps} />     
        </ImageBackground>
      </View >
      )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#312F2F'
    },
    bgImg: {
      width: '100%',
      height: '100%',
    },
  })

 



