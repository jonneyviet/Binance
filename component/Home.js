import React, { Component } from 'react';
import { StyleSheet, Text, View , ScrollView,Dimensions,TouchableOpacity,AsyncStorage,Alert,RefreshControl,Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';


import { config } from './config.js';
const IP_SERVER = config.data.IP_SERVER;
import ItemCoin from './ItemCoin';

let getData = async (callback) =>{
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    var url = IP_SERVER + '/getAll?token=' + fcmToken;
    await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            var alarm = false;
            let docs = responseJson.data;
            return callback({
                alarm: alarm,
                data: docs
            });
        })
        .catch((error) => {
            Alert(error);
        });

}

export default class HomeScreen extends Component {
    static navigationOptions = {
        headerTitle: (
            <Image source={require('./assets/img/logo.png')} style={{ width: 30,resizeMode: 'contain', alignSelf: 'center', marginLeft: 10 }}/>
        ),
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    async componentDidMount(){
        this.checkPermission();
        this.createNotificationListeners();
        getData((data)=>{
            this.setState({'response':data.data});
        });
    }
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    async createNotificationListeners() {
        //App in foreground	 -- ung dung dat tat
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            this.showAlert(title, body);
        });
        //App in background	 -- khi ung dung chay nen
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });
        //khi ung dung duoc mo
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log(notificationOpen.notification);
            this.showAlert(title, body);
        }
        this.messageListener = firebase.messaging().onMessage((message) => {
            console.log(JSON.stringify(message));
        });
    }
    showAlert(title, body) {
        if(typeof(title)!="undefined"){
            Alert.alert(
                title, body,
                [
                    { text: 'OK', onPress: () => this.actionReload() },
                ],
                { cancelable: false },
            );
        }
        
    }
    componentWillReceiveProps(nextProps) {
        var that =this;
        getData((data)=>{
            that.setState({'response':data.data});
        });
    }
    actionClick = async (symbol) =>{
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        var url = IP_SERVER + '/configNotification?token='+fcmToken+'&symbol='+symbol;
        let data = await fetch(url);
        getData((data)=>{
            this.setState({'response':data.data});
        });
    }
    actionReload = async ()=>{
        this.setState({refreshing: true});
        getData((data)=>{
            this.setState({'response':data.data});
            this.setState({refreshing: false});
        });
    }
    render() {
        const {response} = this.state;
        var list = [];
        for(var item in response){
            var bc='#fff';
            if(response[item].status === 'down'){
                bc ='#ffcdd2';
            }
            if(response[item].status === 'up'){
                bc ='#c8e6c9';
            }
            list.push(
                <ItemCoin
                    key={item}
                    name={response[item].symbol}
                    price={response[item].price}
                    volume={response[item].volume}
                    min={response[item].min}
                    max={response[item].max}
                    alert={response[item].alert}
                    bgcolor={bc}
                    action={this.actionClick}
                />
            )
        }
        return (

            <View style={{flex: 1}}>
                <ScrollView style={styles.main}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.actionReload}
                            />
                        }
                >
                    <View style={styles.container}>
                        {
                            list
                        }
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.bottomButtons} onPress={() => this.props.navigation.navigate('Up')}>
                        <View>
                            <Text style={styles.textBtn}>Up</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtons} onPress={() => this.props.navigation.navigate('Down')}>
                        <View>
                            <Text style={styles.textBtn}>Down</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtons} onPress={() => this.props.navigation.navigate('Setting')}>
                        <View>
                            <Text style={styles.textBtn}>Setting</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    main:{
        marginBottom: 40
    },
    logo:{
      width: 20
    },
    container: {
        flex: 1,
        padding: 10
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'#880e4f',
        flexDirection:'row',
        height:40,
        alignItems:'center',
    },
    bottomButtons: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
    },
    textBtn:{
        color:'white',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:16,
    },
    hiddenContainer: {
        top: window.height,
        bottom: -window.height
    }
})

