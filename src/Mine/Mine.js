import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView} from 'react-native'
import React, {Component} from 'react'
import {NavigationActions} from 'react-navigation'
import Dimen from  './../../Tools/dimission'
export default class Mine extends Component{
static navigationOptions = {
    title:'我的'
}
    render(){
        return (
            <View style={styles.container}>
                <Image style={{height:200, width: Dimen.window.width,resizeMode: 'contain'}}
                       source={require('./../../images/logo.png')} />
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    }
})
