import React, {
    useState,
    useEffect
} from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default function Home () {

    let history = useHistory()
    const [localCrncy, setLocalCrncy] = useState("")
    const [solde, setSolde] = useState("")
    var user = firebase.auth().currentUser;
    console.log(user)

    function renderWalletData () {
        fetch("http://192.168.8.55:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            console.log(info);
            info.map(i => {
                //console.log(i.f_uid)
                if(i.f_uid == user.uid) {
                   
                    setLocalCrncy(i.localCrncy)
                    setSolde(i.solde)
                }
            })
        })
    }

    renderWalletData()

    function toCoins () {
        history.push("/Home")
    }

    // logOut function :
    function logOut () {
        firebase.auth().signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }

    useEffect(() => {
       
        renderWalletData()
    }, [])

    return (
        <View style={styles.container} >
            <NavBar style={styles}>
            <NavButton onPress={() => {history.push("/Home")}}>
               <NavButtonText style={styles.Text}>
                    {"Coins"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText
            style={styles.logout}>
                {"LogOut"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <ScrollView style={styles.container}>
                  <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
             
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Your ID : {user.uid}</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Your Email Is : {user.email} </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Your Solde Is : {solde} {localCrncy}</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : { backgroundColor: '#fff', borderColor : 'black' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
     header: {
             backgroundColor: "#00BFFF",
             height: 200,
         },
         avatar: {
             width: 130,
             height: 130,
             borderRadius: 63,
             borderWidth: 4,
             borderColor: "white",
             marginBottom: 10,
             alignSelf: 'center',
             position: 'absolute',
             marginTop: 130
         },
         name: {
             fontSize: 22,
             color: "#FFFFFF",
             fontWeight: '600',
         },
         body: {
             marginTop: 40,
         },
         bodyContent: {
             flex: 1,
             alignItems: 'center',
             padding: 30,
         },
         name: {
             fontSize: 28,
             color: "#696969",
             fontWeight: "600"
         },

         buttonContainer: {
             marginTop: 10,
             height: 45,
             flexDirection: 'row',
             justifyContent: 'center',
             alignItems: 'center',
             marginBottom: 20,
             width: "100%",
             borderRadius: 30,
             backgroundColor: "#00BFFF",
         },
         navBar: {
             backgroundColor: '#006CD5',
         },
             logout: {
      color: "red",
    },
    Text :{
      color: "#FFFFFF",
      fontWeight: "bold",        
    },
});