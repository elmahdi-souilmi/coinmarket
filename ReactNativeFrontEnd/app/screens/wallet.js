import React, {
    useState,
    useEffect
} from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default function Home () {

    let history = useHistory()
    const [localCrncy, setLocalCrncy] = useState("")
    const [solde, setSolde] = useState("")
    var user = firebase.auth().currentUser;
    //console.log(user.uid)

    function renderWalletData () {
        fetch("http://192.168.8.55:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            console.log(info);
            info.map(i => {
                //console.log(i.f_uid)
                if(i.f_uid == user.uid) {
                    console.log(i)
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
        <View>
            <NavBar>
            <NavButton onPress={toCoins}>
                <NavButtonText>
                    {"Coins"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Logout"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <ScrollView style={styles.container}>
                <Text>User ID : {user.uid}</Text>
                <Text>Your Solde Is : {solde} {localCrncy}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {  padding: 16, paddingTop: 30, backgroundColor: '#fff', borderColor : 'black' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    txt : {
        color : 'black',
        borderColor : "green",
        borderWidth : 2,
        padding : 15,
        borderRadius : 8,
        margin : 10,
        backgroundColor : 'gray'
    }
});