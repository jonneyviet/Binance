import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View , ScrollView,Alert,Button,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';

import HomeScreen from './component/Home';
import Setting from './component/Setting';
import detailCoin from './component/detailCoin';
import Up from './component/Up';
import Down from './component/Down';



export default createStackNavigator(

    {
        Home: {
            screen: HomeScreen,
        },
        Setting: {
            screen: Setting,
        },
        Detail:{
            screen: detailCoin,
        },
        Up:{
            screen: Up,
        },
        Down:{
            screen: Down,
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#880e4f',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    })

