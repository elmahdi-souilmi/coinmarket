import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
const axios = require('axios');


const Login = () => {

  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function clearInputs () {
    setEmail('')
    setPassword('')
  }

  function authEmail () {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let id = userCredential.user.uid
    console.log(id);
      // Signed in 
      axios.post('http://192.168.1.7:8080/user/add/', {
        id: id,
      })
    .then(function (response) {
        console.log(response );
      })
    .catch(function (error) {
        console.log(error );
      });
      history.push('/Home')
    })
  }
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Inscription : </Text>
        <TextInput
        style={styles.inp}
        placeholder={"Enter Votre Email"}
        onChangeText={setEmail}
        />
        <TextInput
        style={styles.inp}
        placeholder={"Enter Votre Password"}
        secureTextEntry
        onChangeText={setPassword}
        />
        <View style={styles.con}>
          <Button 
          title="Inscription"
          style={styles.btn}
          onPress={authEmail}
          />
        </View>
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head : {
    fontSize : 40
  },
  inp : {
    width : width / 1.2,
    marginTop : 100,
    padding : 40,
    borderColor : "black",
    borderWidth : 2,
    marginTop : 20,
    padding : 10,
    borderColor : "gray",
    borderWidth : 2,
  },
  con : {
    paddingTop : 20
  }
});