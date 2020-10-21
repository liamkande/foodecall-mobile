import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import {View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
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
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowModal(!showModal)}>
                <FontAwesome
                  name='close'
                  color='#F92B8C'
                  style={{alignSelf:'center'}}
                  size={35}
                />
              </TouchableOpacity>
              <Image style={styles.miniLogo} source={logo} />
              <Text style={styles.modalTxt}>Create an account below:</Text>
              <ScrollView style={{width:'80%', height:'100%', alignSelf:'center'}}>
                <Text style={styles.inputTitle}>Email:</Text>
                <TextInput 
                  style={styles.input}
                  autoCompleteType='email'
                  autoFocus={true}
                  keyboardType='email-address'
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
              <Text style={{alignSelf:'center',marginTop:6, color:'white', fontSize:16}}>By continuing, you agree to the</Text>
              <View style={{alignSelf:'center', flexDirection:'row'}}>
              <TouchableOpacity onPress={handleTermsOfUse}>
                <Text style={{color:'#96CDE8', fontSize:16}}>Terms of Use</Text>
              </TouchableOpacity>
              <Text style={[{color:'white', fontSize:16}]}> and </Text>
              <TouchableOpacity onPress={handlePrivacyPolicy}>
                <Text style={{color:'#96CDE8', fontSize:16}}>Privacy Policy.</Text>
              </TouchableOpacity>
              </View>
              <MainBtn onPress={() => setShowModal(!showModal)} bgColor='#4A9D64' txtColor='white' title='DONE' spaceTop={15} />
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

function handleTermsOfUse() {
  WebBrowser.openBrowserAsync(
    'https://food-e-call.com'
  )
}
function handlePrivacyPolicy() {
  WebBrowser.openBrowserAsync(
    'https://food-e-call.com/admin'
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
    alignSelf:'center'
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
  closeBtn: {
    backgroundColor:'white', 
    alignSelf:'flex-end', 
    justifyContent:'center',
    height: 40, 
    width:40, 
    borderRadius:80, 
    marginBottom:-40, 
    marginRight:10, 
    marginTop:10
  }
})


