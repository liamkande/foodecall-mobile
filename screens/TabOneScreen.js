import * as React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import ImgBgView from '../components/imgBgView'

const logo = '../assets/images/logoCircle.png'

export default function TabOneScreen() {
  return (
      <ImgBgView main={true}>
        <Image style={styles.logo} source={require(logo)} />
        <Text style={styles.txt}>The food delivery app, designed</Text>
        <Text style={styles.txt}>with you in mind <FontAwesome
          name='heart'
          color='#F92B8C'
          size={18}
        />
        </Text>
      </ImgBgView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: '5%'
  },
  txt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight:'bold',
    shadowColor: "black",
    shadowOpacity: 3,
    shadowOffset: {
      height: 3,
      width: 6
    },
  },
})


