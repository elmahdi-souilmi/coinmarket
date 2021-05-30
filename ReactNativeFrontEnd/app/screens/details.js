import React, { useEffect, useState } from 'react'
import firebase from '../config';
const axios = require('axios');
import { useHistory } from 'react-router';
import Modal from 'react-native-modal';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image,TextInput, ScrollView   } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import { Button } from '@material-ui/core';

export default function Details (props) {

    var user = firebase.auth().currentUser;
    let history = useHistory()
    // const [dataa, setData] = React.useState([])
    const [date, setDate] = React.useState([])
    const [priceUsdd, setPriceUsd] = React.useState([])
    const [price, setPrice] = React.useState("")
    const [val, setCurrVal] = React.useState("")
    const [value, setValue] = React.useState("0")
    const { id, name, symbol, changePercent24Hr, priceUsd } =
    (props.location && props.location.state) || {};


    function buy () {
      console.log("test");
      fetch("http://192.168.1.7:8080/user/userWallet").then(res => {
        return res.json()
      }).then(data => {
        data.map(i => {
          if(i.f_uid == user.uid){
            //console.log(i)
            //console.log(i.id+" "+name+" "+val+" "+val*priceUsd)
            fetch("http://192.168.1.7:8080/wallet/add", {
              method : 'POST',
              headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({
                id : i.id.toString(),
                id_user : i.id.toString(),
                cryp_name : name,
                currencyPrice : val*priceUsd,
                value : parseFloat(val)
              })
            }).then(res => {
              return res.json()
            }).then(info => {
              alert("Done")
              history.push("/Home")
            })
          }
        })
      })
    }

        function sell() {
          console.log("test");
          fetch("http://192.168.1.7:8080/user/userWallet").then(res => {
            return res.json()
          }).then(data => {
            data.map(i => {
              if (i.f_uid == user.uid) {
                //console.log(i)
                //console.log(i.id+" "+name+" "+val+" "+val*priceUsd)
                fetch("http://192.168.1.7:8080/wallet/sell", {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: i.id.toString(),
                    idUser: i.id.toString(),
                    currencyName: name,
                    currencyPrice: val * priceUsd,
                    value: parseFloat(val)
                  })
                }).then(res => {
                  return res.json()
                }).then(info => {
                  alert("Done")
                  history.push("/Home")
                })
              }
            })
          })
        }
    function renderData () {
        fetch("http://192.168.1.7:8080/user/userWallet").then(res => {
          return res.json()
        }).then(data => {
          data.map(i => {
            if(i.f_uid == user.uid){
              setPrice(i.solde)
              //console.log(i)
              fetch("http://192.168.1.7:8080/wallet/allWallet").then(res => {
                return res.json()
              }).then(info => {
                info.map(o => {
                  if(o.id_user == i.id){
                    if(o.cryp_name.toLowerCase() == name.toLowerCase()) {
                      //console.log(o)
                      setValue(o.value)
                    }
                  }
                })
              })
            }
          })
        })
    }

   async function  getData () {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let tenDaysAgo = today - 1000 * 60 * 60 * 24 * 7
      let timenow = Math.floor(today)
      let tennDaysAgo = Math.floor(tenDaysAgo)

axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${tennDaysAgo}&end=${timenow}`)
  .then(function (response) {
    // handle success
     console.log(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${tennDaysAgo}&end=${timenow}`)
     
     let data = response.data.data;
      console.log(data);
     let date = [];
     let value = [];
     for (let i = 0; i < 7; i++) {
       date.push(data[i].date.substring(5, 10));
       value.push(parseFloat(data[i].priceUsd).toFixed(6));
     }
    setDate(date)
    setPriceUsd(value)
     console.log(date);
      console.log(value);
    
    })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


    }  

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }

    useEffect(() => {
      getData()
      renderData()
      console.log(user.uid)
    }, [])
    

    return (
        <ScrollView>
            <NavBar>
            <NavTitle>
            {user.email}
            </NavTitle>
            <NavButton onPress={() => {history.push("/Home")}}>
                <NavButtonText>
                    {"Retour"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Se Deconnecter"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <View  style={styles.container}>
                <View style={styles.listItem}>
                    <Image source={{uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
                    <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                      <Text style={{fontWeight:"bold"}}>{name}</Text>
                      <Text >{symbol}</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                      <Text style={{fontWeight:"bold"}}>${parseFloat(priceUsd).toFixed(2)}</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                        <Text style={ 
                        changePercent24Hr > 0
                        ? { fontWeight:"bold", color: "green" }
                        : { fontWeight:"bold", color: "red" }
                        }>{parseFloat(changePercent24Hr).toFixed(2)} %</Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                  <Text style={{fontWeight:"bold"}}>My Solde Is : {price}</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={{fontWeight:"bold"}}>How Many {name} Currency You Have : {value}</Text>
                </View>
                <View style={styles.listItem}>
                    <TextInput
                    placeholder={"Enter The Value of Currency you Want to Buy"}
                    onChangeText={setCurrVal}
                    />
                </View>
                <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                    <Text style={styles.txt} onPress={buy}>Buy</Text>
                    <Text style={styles.txt} onPress={sell} >Sell</Text>
                </View>
                <LineChart
                    data={{
                        labels: date,
                        datasets: [
                        {
                            data: priceUsdd
                        }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "5",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    margin:2,
                    padding:2
                    }}
                /> 
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      marginTop:0,
      justifyContent: "center", 
      alignItems: "center",
      
    },
    txt : {
        fontSize : 26,
        elevation: 1,
        color : 'white',
        backgroundColor: "orange",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 60,
        marginHorizontal: "4%",
        marginTop: 8,
        minWidth: "30%",
    },  
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"90%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      elevation: 3,
      shadowOffset: { width: 1 , height:1},
      shadowColor: "#333",
      shadowOpacity: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      
  
    },
    textHeder:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    itemTextHeder:{
      textAlign:'left'
  
    },
    baseText: {
    },
  
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    },
    ButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    appButtonContainer: {
      elevation: 1,
      backgroundColor: "orange",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 0,
      marginHorizontal: "4%",
      marginTop: 8,
      minWidth: "30%",
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
  
    modalContainer:{
      flex: 0.5,
      backgroundColor:"#FFF",
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius:15,
    },
    appButtonContainerNoBg: {
      
      backgroundColor: "#FFF",
      borderRadius: 30,
      borderWidth :2,
      borderColor : '#2ecc71',
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginHorizontal: "1%",
      marginBottom: 2,
      marginTop: 8,
      width: "30%",
    },
    appButtonTextNoBg: {
      fontSize: 18,
      color: "#2ecc71",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    appButtonContainerNoBg2: {
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginHorizontal: "1%",
      marginBottom: 2,
      marginTop: 8,
      width: "30%",
    },
    appButtonTextNoBg2: {
      fontSize: 18,
      color: "#FFF",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"95%",
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      elevation: 8,
    },
    input: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: "#f1f2f6",
      borderRadius: 60,
      width: "80%",
    },
});