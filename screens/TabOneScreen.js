import * as React from 'react'
import {View, Image, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import MainView from '../components/mainView'
import MainBtn from '../components/mainBtn'
import ModalView from '../components/modalView'

const logo = require('../assets/images/logoCircle.png')

export default function TabOneScreen() {
  const [showModal, setShowModal] = React.useState(false)
  const [modalType, setModalType] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [inputBg, setInputBg] = React.useState('red')
  

  
  const handleSignUp = async () => {
    setModalType('signUp')
    setShowModal(true)
  }

  const handleSignIn = async () => {
    setModalType('signIn')
    setShowModal(true)
  }

  return (
      <MainView>
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
          <ModalView  modalWidth='100%' innerHeight='100%' showModal={showModal} type={modalType}>
            { modalType == 'signUp' &&
            <View style={{justifyContent:'center',}}>
              <Image style={styles.miniLogo} source={logo} />
              <Text style={styles.modalTxt}>Create an account below:</Text>
              <ScrollView style={{width:'80%', height:'100%', alignSelf:'center'}}>
                <Text style={styles.inputTitle}>Email:</Text>
              <TextInput 
                style={styles.input}
                autoCompleteType='email'
                autoFocus={true}
                keyboardType='email-address'
                onBlur={() => setInputBg('green')}
                value={email}
                onChangeText={input => setEmail(input)}
                placeholderTextColor='#8E8F95'
                placeholder='Enter your email'
              />
              <Text style={styles.inputTitle}>Password:</Text>
              <TextInput 
                style={styles.input}
                autoCompleteType='password'
                secureTextEntry={true}
                value={password}
                onChangeText={input => setPassword(input)}
                placeholderTextColor='#8E8F95'
                placeholder='At least 6 characters'
              />
              <MainBtn onPress={() => setShowModal(!showModal)} bgColor='#4A9D64' txtColor='white' title='DONE' spaceTop={40} />
              </ScrollView>
            </View>
            }
            { modalType == 'signIn' &&
            <View style={{justifyContent:'center',}}>
            <Image style={styles.miniLogo} source={logo} />
            <ScrollView style={{width:'80%', height:'100%', alignSelf:'center'}}>
              <Text style={styles.inputTitle}>Email:</Text>
            <TextInput 
              style={styles.input}
              autoCompleteType='email'
              autoFocus={true}
              keyboardType='email-address'
              onBlur={() => setInputBg('green')}
              value={email}
              onChangeText={input => setEmail(input)}
              placeholderTextColor='#8E8F95'
              placeholder='Email'
            />
            <Text style={styles.inputTitle}>Password:</Text>
            <TextInput 
              style={styles.input}
              autoCompleteType='password'
              secureTextEntry={true}
              value={password}
              onChangeText={input => setPassword(input)}
              placeholderTextColor='#8E8F95'
              placeholder='•••••••'
            />
            <MainBtn onPress={() => setShowModal(!showModal)} bgColor='white' txtColor='#FF4F6B' title='Sign In' spaceTop={40} />
            </ScrollView>
          </View>
            }
          </ModalView>
      </MainView>
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
  miniLogo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
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
  modalTxt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight:'bold', 
    },
  inputTitle: {
    color:'white',
    fontSize: 21,
    marginTop:'5%',
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    color: '#312F2F',
    fontSize: 18,
    height:50,
    borderColor: 'white',
    backgroundColor:'#EDEEEF', 
    borderWidth: 2,
    textAlign: 'center',
    borderRadius:6,
    fontWeight: 'bold',
  },
})


