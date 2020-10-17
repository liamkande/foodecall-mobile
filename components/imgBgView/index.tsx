import React from 'react'
import { View, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'


export default function ImgBgView(props) {
    const {main, original, ...otherProps } = props
    const mainImg = require('../../assets/images/mainBg.png') 
    const originalImg = require('../../assets/images/originalBg.png')
    const [bgImg, setBgImg] = React.useState( main ? mainImg : 
                                              original ? originalImg : 
                                              null) 
    return (
      <View style={styles.container}  >
        <ImageBackground style={styles.bgImg} source={bgImg}>
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
    },
    bgImg: {
      width: '100%',
      height: '100%',
    },
  })

 



