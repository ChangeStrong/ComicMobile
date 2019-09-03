import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView} from 'react-native'
import React, {Component} from 'react'
import {NavigationActions} from 'react-navigation'
export default class Mine extends Component{
static navigationOptions = {
    title:'我的'
}
    render(){
        return (
            <View style={styles.container}>
                <Text>this is my page</Text>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container:{
        flex:1
    }
})
