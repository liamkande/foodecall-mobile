import React from 'react'
import { View, Modal, SafeAreaView, StyleSheet } from 'react-native'
import MainBtn from '../mainBtn'

export default function ModalView(props) {
    const {type, showModal, ...otherProps } = props
    const mainImg = require('../../assets/images/mainBg.png') 
    const originalImg = require('../../assets/images/originalBg.png')
    const [bgImg, setBgImg] = React.useState( type == 'main' ? mainImg : 
                                              type == 'original' ? originalImg : 
                                              null) 
    return (
      <Modal animationType='slide' transparent visible={showModal}>
        <View style={styles.container} >
          <SafeAreaView style={styles.innerContainer} {...otherProps}/>
          
         
        </View >
      </Modal>
      )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
   
    },
    innerContainer: {
     backgroundColor: '#312F2F',
     height:'56%'

    },
    bgImg: {
      width: '100%',
      height: '100%',
    },
  })

 



