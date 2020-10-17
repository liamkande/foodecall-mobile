import * as React from 'react'
import {View, Image, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import ImgBgView from '../components/imgBgView'
import MainBtn from '../components/mainBtn'

const logo = require('../assets/images/logoCircle.png')

export default function TabOneScreen() {
  return (
      <ImgBgView main={true}>
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
          <MainBtn onPress={() => alert('Get Started')} bgColor='#FF4F6B' txtColor='white' title='Get Started'/>
          <MainBtn onPress={() => alert('Sign In')}  bgColor='white' txtColor='#FF4F6B' title='Sign In' spaceTop={40} />
          </View>
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


