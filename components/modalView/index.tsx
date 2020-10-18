import React from 'react'
import { View, Modal, SafeAreaView, StyleSheet } from 'react-native'


export default function ModalView(props) {
    const {type, showModal, modalWidth, innerHeight, ...otherProps } = props
 
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
      borderRadius:25,
      marginTop:'10%'
    },

  })

 



