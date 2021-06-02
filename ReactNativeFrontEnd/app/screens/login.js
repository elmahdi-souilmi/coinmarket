import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput,Image } from 'react-native';
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

    function toLogin() {
      history.push("/")
    }

  function authEmail () {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    let id = userCredential.user.uid
      // Signed in 
      axios.post('http://192.168.8.55:8080/user/add/', {
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
   
        <Text style={styles.head}> Create account </Text>
        <TextInput
        style={styles.inp}
        placeholder={"Email"}
        onChangeText={setEmail}
        />
        <TextInput
        style={styles.inp}
        placeholder={" Password"}
        secureTextEntry
        onChangeText={setPassword}
        />
        <View style={styles.con}>
          <Button 
          title="Create"
          style={styles.btn}
          onPress={authEmail}
          />
                    <Button 
          title = "I have already an account "
          style={styles.btn}
          onPress={toLogin}
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
    fontSize : 35, 
    color: "#006CD5"
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