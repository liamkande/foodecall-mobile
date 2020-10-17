import * as React from 'react'
import {View, Image, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import ImgBgView from '../components/imgBgView'
import MainBtn from '../components/mainBtn'
import ModalView from '../components/modalView'

const logo = require('../assets/images/logoCircle.png')

export default function TabOneScreen() {
  const [showModal, setShowModal] = React.useState(false)
  const [modalType, setModalType] = React.useState('')

  
  const handleSignUp = async () => {
    setModalType('signUp')
    setShowModal(true)
  }

  const handleSignIn = async () => {
    setModalType('signIn')
    setShowModal(true)
  }

  return (
      <ImgBgView type='main'>
        <View style={{height:'70%'}}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.txt}>The food delivery app, designed</Text>
          <Text style={styles.txt}>with you in mind <FontAwesome
            name='heart'
            color='#F92B8C'
            size={18}
          />
          </Text> 
        </View>
        <View style={{height:'20%', marginBottom:'10%'}}>
          <MainBtn onPress={handleSignUp} bgColor='#FF4F6B' txtColor='white' title='Get Started'/>
          <MainBtn onPress={handleSignIn}  bgColor='white' txtColor='#FF4F6B' title='Sign In' spaceTop={40} />
          </View>
          <ModalView width={'100%'} showModal={showModal} type={modalType}>
            { modalType == 'signUp' &&
            <View>
              <MainBtn onPress={() => setShowModal(!showModal)} bgColor='#4A9D64' txtColor='white' title='DONE'/>
            </View>
            }
            { modalType == 'signIn' &&
              <MainBtn onPress={() => setShowModal(!showModal)} bgColor='white' txtColor='#FF4F6B' title='Sign In'/>
            }
          </ModalView>
      </ImgBgView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: '5%'
  },
  txt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 21,
    fontWeight:'bold',
    shadowColor: "black",
    shadowOpacity: 3,
    shadowOffset: {
      height: 3,
      width: 6
    },
  },
})


