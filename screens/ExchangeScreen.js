import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js'

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userName : firebase.auth().currentUser.email,
            item:"",
            description:"",
        }
    }

    addItem = (item, description)=>{
        db.collection("exchange_requests").add({
            "userName" : this.state.userName,
            "item": this.state.item,
            "description" : this.state.description 
        });
        this.setState({
            item : "",
            description : "",
        }) 
        return(
            Alert.alert("ITEM READY TO EXCHANGE",
            '',
            [
            {text: 'OK' , onPress: ()=>{
                this.props.navigation.navigate('HomeScreen')
            }}
            ]
        ));      
    }

    render(){
        return(
            <View style={{flex:1}}>
             <MyHeader title="ADD AN ITEM"/>
                <KeyboardAvoidingView style={styles.keyBoardStyle} behavior="padding">
   
            

                <TextInput style={styles.formTextInput}
                    placeholder="Item name"
                    onChangeText={(text)=>{
                        this.setState({
                            item : text
                        })
                    }}
                    value={this.state.item}
                />
                <TextInput style={[styles.formTextInput,{height:250}]}
                    placeholder="Item description"
                    numberOfLines={8}
                    multiline
                    onChangeText={(text)=>{
                        this.setState({
                            description : text
                        })
                    }}
                    value={this.state.description}
                />
                <TouchableOpacity style={styles.button}
                    onPress = {() => {this.addItem(this.state.item, this.state.description)}}
                >
                    <Text>Add Item</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"50%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"50%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
  