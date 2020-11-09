import * as WebBrowser from 'expo-web-browser'
import React, { useState } from 'react'
import * as firebase from "firebase"
import {View, Image, Text, TextInput, ScrollView, 
  TouchableOpacity, StyleSheet, Button, Alert,
  ActivityIndicator,
  Platform } from 'react-native'
import * as FirebaseRecaptcha from "expo-firebase-recaptcha"
import { FontAwesome } from '@expo/vector-icons'
import MainView from '../components/mainView'
import MainBtn from '../components/mainBtn'
import ModalView from '../components/modalView'

const logo = require('../assets/images/logoCircle.png')

const FIREBASE_CONFIG: any = {
  /*apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",*/

  apiKey: "AIzaSyB-vGBbYDQ6thqBcJlThhb2IweLgFR4dxo",
  authDomain: "food-e-call-app.firebaseapp.com",
  databaseURL: "https://food-e-call-app.firebaseio.com",
  projectId: "food-e-call-app",
  storageBucket: "food-e-call-app.appspot.com",
  messagingSenderId: "11077193153",
  appId: "1:11077193153:web:dc3cc5ec5fec1f87473340",
  measurementId: "G-K9Y40B9PGL"
}

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

export default function TabOneScreen() {
  const [showModal, setShowModal] = React.useState(false)
  const [modalType, setModalType] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [phoneCode, setPhoneCode] = React.useState('')

  const [activityType, setActivityType] = React.useState(null)

  const [showCodeInput, setShowCodeInput] = React.useState(null)

  const [newEmail, setNewEmail] =React.useState('')
  


  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
const [confirmError, setConfirmError] = React.useState();
 const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;






  // const [confirm, setConfirm] = useState(null)
  
  // const [code, setCode] = useState('')

  
  // const signInWithPhoneNumber = async (phoneNumber, code) => {
  //   const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, code)
  //   setConfirm(confirmation)
  
  // }



  // const confirmCode = async () => {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 424-333-6901', '123456')}
  //     />
  //   );
  // }

  const handleSignUp = async () => {
    setModalType('signUp')
    setShowModal(true)
    setActivityType('signUp')
  }
  const handleSignIn = async () => {
    setModalType('signIn')
    setShowModal(true)
  }

  const handlePhoneAuth = async () => {
    setModalType('phoneAuth')
    setShowModal(true)
    setShowCodeInput(null)
  }


  const signup = async () => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.sendEmailVerification()
      const user = {
        uid: response.user.uid,
        email: email,
        createdAt: new Date(),
        lastActive:{
                date: new Date(),
                activityType: activityType
        },
        phone:'', 
        emailVerified:false,       
      }
      if(response.user.uid) {
        firebase.firestore().collection('users').doc(response.user.uid).set(user)
        setShowModal(!showModal)   
           
      }
    } catch (e) {
			alert(e)
		}
  }


  const signIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.reload()
			const uid = await firebase.auth().currentUser.uid
      const verified = await firebase.auth().currentUser.emailVerified

      if(uid) {
        const user = await firebase.firestore().collection('users').doc(uid).get()
        alert(`Welcome: ${user.data().email}`)  
      //setShowModal(!showModal) 
      } 
    } catch (e) {
			alert(e)
		}
  }

  const resetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      alert(`A reset link has been sent to ${email} Please reset your password and try again...`)
    } catch (e) {
			alert(e)
		}
  }


  const updateEmail = async () => {
    try {
      const uid = await firebase.auth().currentUser.uid
      const user = await firebase.firestore().collection('users').doc(uid).get()
      await firebase.auth().currentUser.updateEmail(newEmail)
      await firebase.firestore().collection('users').doc(uid).update({
        email:newEmail,
        emailVerified:false

      })
      await firebase.auth().currentUser.reload()
      await firebase.auth().currentUser.sendEmailVerification()
      alert(`We've updated your email address from: ${user.data().email} to: ${newEmail}. Please sign back in!`)
      firebase.auth().signOut()
    } catch (e) {
			alert(e)
		}
  }

  const emailVerification = async () => {
    try {
      await firebase.auth().currentUser.reload()
      const uid = await firebase.auth().currentUser.uid
      const verified = await firebase.auth().currentUser.emailVerified

      if(verified) {
          await firebase.firestore().collection('users').doc(uid).update({
          emailVerified:true
        })
        alert('Yay! your email has been verified')

      } else {
        await firebase.auth().currentUser.sendEmailVerification()
        await firebase.firestore().collection('users').doc(uid).update({
          emailVerified:false
        })
        alert('sorry! Please make sure you verify your email.')
      }
    } catch (e) {
			alert(e)
		}
  }



  const updatePhone = async () => {
    try {
      const uid = await firebase.auth().currentUser.uid      
      await firebase.firestore().collection('users').doc(uid).update({
        phone:phoneNumber
      })
      await firebase.auth().currentUser.reload()
    } catch (e) {
			alert(e)
		}
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
          <MainBtn onPress={handlePhoneAuth} bgColor='purple' txtColor='white' title='Phone Auth'/>
          <MainBtn onPress={handleSignUp} bgColor='#FF4F6B' txtColor='white' title='Get Started' spaceTop={10}/>
          <MainBtn onPress={handleSignIn}  bgColor='white' txtColor='#FF4F6B' title='Sign In' spaceTop={40} />
          </View>
          <ModalView  modalWidth='100%' innerHeight='100%' showModal={showModal} type={modalType}>
            { modalType == 'phoneAuth' &&
            <View style={{justifyContent:'center',}}>
                      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowModal(!showModal)}>
              <FontAwesome
                name='close'
                color='#F92B8C'
                style={{alignSelf:'center'}}
                size={35}
              />
            </TouchableOpacity>
            <Image style={styles.miniLogo} source={logo} />
            <ScrollView style={{width:'80%', height:'100%', alignSelf:'center'}}>
              
            
              <View>
              <Text style={styles.inputTitle}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                autoFocus={isConfigValid}
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder="+1 999 999 9999"
                editable={!verificationId}
                onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
                />

              <Button
                title={`${verificationId ? "Resend" : "Send"} Verification Code`}
                disabled={!phoneNumber}
                onPress={async () => {
                  const phoneProvider = new firebase.auth.PhoneAuthProvider();
                  try {
                    setVerifyError(undefined);
                    setVerifyInProgress(true);
                    setVerificationId("");
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                      phoneNumber,
                      // @ts-ignore
                      recaptchaVerifier.current
                    );
                    setVerifyInProgress(false);
                    setVerificationId(verificationId);
                    verificationCodeTextInput.current?.focus();
                  } catch (err) {
                    setVerifyError(err);
                    setVerifyInProgress(false);
                  }
                }}
              />

              {verifyError && (
                <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
              )}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>
            A verification code has been sent to your phone
          </Text>
        ) : undefined}
        <Text style={styles.inputTitle}>Enter verification code</Text>
        <TextInput
          ref={verificationCodeTextInput}
          style={styles.input}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={(verificationCode: string) =>
            setVerificationCode(verificationCode)
          }
        />

        <Button
          title="Confirm Verification Code"
          disabled={!verificationCode}
          onPress={async () => {
            try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              // const credential = firebase.auth.PhoneAuthProvider.credential(
              //   verificationId,
              //   verificationCode
              // );
              // const authResult = await firebase
              //   .auth()
              //   .signInWithCredential(credential);
              setConfirmInProgress(false);
              setVerificationId("");
              setVerificationCode("");
              verificationCodeTextInput.current?.clear();
              updatePhone()
              // Alert.alert("Phone authentication successful!");
              setShowModal(!showModal) 
             
            } catch (err) {
              setConfirmError(err);
              setConfirmInProgress(false);
            }
          }}
        />
        {confirmError && (
          <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
        )}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}


               {/* <MainBtn onPress={() => phone ? setShowCodeInput('codeInput') : alert('Please enter phone number before continuing!') } bgColor='#4A9D64' txtColor='white' title='NEXT' spaceTop={15} /> */}
              </View>
              
              { showCodeInput == 'codeInput' &&
              <View>
                <Text style={styles.inputTitle}>A verification code was sent to {phone} </Text>
                <Text style={styles.inputTitle}>Verification code:</Text>
                <TextInput 
                  style={styles.input}
                  keyboardType='numeric'
                  autoFocus={true}
                  value={phoneCode.trim()}
                  onChangeText={input => setPhoneCode(input)}
                  placeholderTextColor='#8E8F95'
                  placeholder='Enter Verification code'
                />
                <MainBtn onPress={() => phoneCode ? setShowCodeInput(null) : alert('Invalid Code')} bgColor='#4A9D64' txtColor='white' title='CONTINUE' spaceTop={15} />
              </View>
              }
            </ScrollView>
          </View>
            }
            
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
                  value={email.trim()}
                  onChangeText={input => setEmail(input)}
                  placeholderTextColor='#8E8F95'
                  placeholder='Enter your email'
                />
                <Text style={styles.inputTitle}>Password:</Text>
              <TextInput 
                style={styles.input}
                autoCompleteType='password'
                secureTextEntry={true}
                value={password.trim()}
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
              <MainBtn onPress={signup} bgColor='#4A9D64' txtColor='white' title='DONE' spaceTop={15} />
              </ScrollView>
            </View>
            }
            { modalType == 'signIn' &&
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
            <ScrollView style={{width:'80%', height:'100%', alignSelf:'center'}}>
              <Text style={styles.inputTitle}>Email:</Text>
              <TextInput 
                style={styles.input}
                autoCompleteType='email'
                autoFocus={true}
                keyboardType='email-address'
                value={email.trim()}
                onChangeText={input => setEmail(input)}
                placeholderTextColor='#8E8F95'
                placeholder='Enter your email'
              />
              <Text style={styles.inputTitle}>Password:</Text>
            <TextInput 
              style={styles.input}
              autoCompleteType='password'
              secureTextEntry={true}
              value={password.trim()}
              onChangeText={input => setPassword(input)}
              placeholderTextColor='#8E8F95'
              placeholder='At least 6 characters'
            />

            <TextInput 
              style={styles.input}
              autoCompleteType='email'
              autoFocus={true}
              keyboardType='email-address'
              value={newEmail.trim()}
              onChangeText={input => setNewEmail(input)}
              placeholderTextColor='#8E8F95'
              placeholder='Update email'
              />

              <TouchableOpacity onPress={resetPassword}>
                <Text style={{alignSelf:'center', color:'#FF4F6B', fontSize:18, marginTop:10,}}>Forgot Password?</Text>
              </TouchableOpacity>

 

            <TouchableOpacity onPress={updateEmail}>
              <Text style={{alignSelf:'center', color:'yellow', fontSize:18, marginTop:10,}}>Update Email!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={emailVerification}>
              <Text style={{alignSelf:'center', color:'orange', fontSize:18, marginTop:10,}}>verification Check</Text>
            </TouchableOpacity>

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

            <MainBtn onPress={signIn} bgColor='white' txtColor='#FF4F6B' title='DONE' spaceTop={15} />
            <MainBtn onPress={() => firebase.auth().signOut()} bgColor='white' txtColor='#FF4F6B' title='Sign Out' spaceTop={15} />

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
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
})


