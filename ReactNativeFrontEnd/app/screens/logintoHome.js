import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { blue } from '@material-ui/core/colors';

const LogintoHome = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function toInscription () {
        history.push("/Inscription")
    }

    let loginUser = () => {

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            history.push("/Home")
            // ...
        })
          .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage)
        });  
    }

    return (
        <View style={styles.container}>
                   <Text  style={styles.header}> Coins Market</Text>
              <Image
              source = {
                {uri: 'https://w7.pngwing.com/pngs/372/192/png-transparent-commonwealth-bank-currency-converter-foreign-exchange-market-exchange-rate-bank.png'}
              }
              style={styles.img}
                />

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
                style={styles.btn1}
                title="Se Connecter"
                onPress={loginUser}
                />
                
                <Button
                style={styles.btn2}
                title="Inscription"
                onPress={toInscription}
                />
            </View>
        </View>
    )

}

export default LogintoHome;

const styles = StyleSheet.create({
  header :{ 
    color: "#006CD5",
    fontSize: 28,
    marginBottom:30,
  },
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
      width : width / 1.07,
      height : 40,
      marginTop : 20,
      padding : 7,
      borderColor : "black",
      borderWidth : 1,
      borderRadius : 8
    },
    con : {
      paddingTop : 20,
      color : "#841584"
    },
    img : {
        width: 200,
        height: 200,
        borderRadius: 100
    }
});