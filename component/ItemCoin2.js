import React, { Component } from 'react';
import {StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
class itemCoin2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
                <View style={[styles.item_coin_content,{backgroundColor:this.props.bgcolor}]}  >

                    <View style={styles.item_coin_block}>
                        <Text style={[styles.item_coin,styles.name_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.date}</Text>
                        <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.price}</Text>
                    </View>
                    <View style={styles.item_coin_volume}>
                        <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>Volum</Text>
                        <Text style={[styles.item_coin,styles.data,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.volume}</Text>
                    </View>
                    <View style={[styles.item_coin_precent,styles.percent_block]}>
                        <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>Percent(%)</Text>
                        <Text style={[styles.item_coin,styles.data,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.percent}</Text>
                    </View>
                </View>
        );
    }
}
export default withNavigation(itemCoin2);
const styles = StyleSheet.create({
    item_coin_content:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#989898',
        borderBottomWidth: 1,
    },
    item_coin_block:{
        flex:2,

    },
    item_coin_volume:{
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
        textAlign: 'center',
    },
    item_coin_precent:{
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
        textAlign: 'center',
    },
    item_coin: {
        color:'#333333'
    },
    name_coin:{
        fontSize:16,
        fontWeight: 'bold',
        color: '#990033',
    },
    data:{
        fontWeight: 'bold',
        fontSize: 14
    },
    white:{
        color:'#333333'
    }

})

