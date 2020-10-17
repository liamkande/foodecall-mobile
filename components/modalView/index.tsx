import React from 'react'
import { View, Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import MainBtn from '../mainBtn'

export default function ModalView(props) {
    const {type, showModal, modalWidth, innerHeight, ...otherProps } = props
    const mainImg = require('../../assets/images/mainBg.png') 
    const originalImg = require('../../assets/images/originalBg.png')
    const [bgImg, setBgImg] = React.useState( type == 'main' ? mainImg : 
                                              type == 'original' ? originalImg : 
                                              null) 
    return (
      <Modal animationType='slide' transparent visible={showModal}>
        <View style={[styles.modal, {width:modalWidth,}]} >
          <SafeAreaView style={[styles.innerModal, {height:innerHeight}]} {...otherProps}/>
          

          
        </View >
      </Modal>
      )
  }
  
  const styles = StyleSheet.create({
    modal: {
      flex: 1,  
      alignSelf:'center',
    },
    innerModal: {
      backgroundColor:'#312F2F', 
    },
    bgImg: {
      width: '100%',
      height: '100%',
    },
  })

 



