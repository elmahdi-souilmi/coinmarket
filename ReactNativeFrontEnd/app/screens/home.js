import React, { useState,useEffect  } from 'react'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import firebase from '../config'
import { useHistory } from 'react-router';
import NavBar, { NavButton, NavButtonText } from 'react-native-nav';


export default function Home () {

    let history = useHistory()
    const [names, setNames] = useState([])
     firebase.auth().currentUser;
    function renderCoinData () {
        fetch("http://api.coincap.io/v2/assets?limit=15").then(res => {
            return res.json()
        })
        .then(info => {
            setNames(info.data)
        })
    }
    
    function toWallet () {
        history.push("/Wallet")
    }
    // logOut function :
    function logOut () {
        firebase.auth().signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }
    useEffect(() => {
        renderCoinData()
    }, [])

    return (
        <ScrollView style={styles.view}>
        <StatusBar
        backgroundColor="black"
        barStyle = 'light-content'
         />
            <NavBar style={styles}>
            <NavButton onPress={toWallet}>
                <NavButtonText style={styles.Text}>
                    {"My Wallet"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText
            style={styles.logout}>
                {"LogOut"}
            </NavButtonText>
            </NavButton>
            </NavBar>
                {names.map((i) => (
                    <TouchableOpacity key={i.symbol} onPress={() => history.push('/Details', i)}>
                        <View  style={styles.listItem}>
                            <Image source={{uri: `https://assets.coincap.io/assets/icons/${i.symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
                            <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                                <Text style={{fontWeight:"bold"}}>{i.name}</Text>
                                <Text >{i.symbol}</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                                <Text style={{fontWeight:"bold"}}>${parseFloat(i.priceUsd).toFixed(2)}</Text>
                            </View>
                            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                                <Text style={{fontWeight:"bold"},
                                i.changePercent24Hr > 0 ? {  color: "green" } : {  color: "red" } 
                                }>{parseFloat(i.changePercent24Hr).toFixed(2)} %</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view:{ 
backgroundColor: "#C3E2FF"
    },
   navBar: {
    backgroundColor: '#006CD5',
    },
    container: {
        flex: 1,
        backgroundColor: '#C3E2FF',
        marginTop:0
    },
    listItem:{
        margin:5,
        padding:15,
        backgroundColor: "#FFFFFF",
        width:"95%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5,
        elevation: 3,
        shadowOffset: { width: 1 , height:1},
        shadowColor: "#333",
        shadowOpacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout :{
        color: "red",
    },
    Text :{
    color: "#FFFFFF",
    fontWeight: "bold",        
    }
});