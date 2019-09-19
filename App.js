/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {HomeView} from './src/Home/home'
import ProductDetail from './src/Home/ProductDetail/ProductDetail';
import ProductLook from './src/Home/ProductLook/ProductLook';
import ProductList from './src/Home/ProductDetail/ProductList'
import LayoutTool from "./Tools/Layout"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from  'react-navigation-stack'
import {createBottomTabNavigator} from  'react-navigation-tabs'

import Mine from './src/Mine/Mine';

//主页模块
const HomeStack = createStackNavigator({
  HomeNavVC:{
    screen:HomeView,
    navigationOptions:({navigation}) => ({
      header:null,
    })
  },
  HomeProductDetailVC:{
    screen:ProductDetail,
  },
  ProductLookVc:{
    screen:ProductLook,
  },
  ProductListVC:{
    screen:ProductList,
  }
},{
  initialRouteName: "HomeNavVC",
  headerMode: 'float',
  defaultNavigationOptions:({navigation}) =>({
    headerTintColor: '#F2D3AB',//标题文字颜色
  }),
  // 设置二级页面隐藏tabBar
  navigationOptions: ({navigation}) => ({tabBarVisible: navigation.state.index > 0 ? false : true,
  })
});

const MineStack = createStackNavigator({
  MineNavVC:{
    screen:Mine,
  }
},{
  initialRouteName: "MineNavVC",
  defaultNavigationOptions:({navigation}) =>({
    headerTintColor: '#F2D3AB',//标题文字颜色
  }),
  // 设置二级页面隐藏tabBar
  navigationOptions: ({navigation}) => ({tabBarVisible: navigation.state.index > 0 ? false : true,
  })
});

const TabNavigator = createBottomTabNavigator({
      HomePage:{
        screen:HomeStack,
        navigationOptions:()=>sTabBarOptions('首页', require("./images/tabBar/nav1.png"), require("./images/tabBar/icon_tabBarHomeSelect.png"))
      },
      MinePage:{
        screen:MineStack,
        navigationOptions:()=>sTabBarOptions('我的', require("./images/tabBar/nav3.png"), require("./images/tabBar/icon_tabBarMineSelect.png"))
      },

    },{
      defaultNavigationOptions: ({ navigation}) => ({
        tabBarOptions: {
          activeTintColor: '#D6BC98',
          inactiveTintColor: '#D6BC98',
          indicatorStyle: { height: 0 },
          labelStyle: {
            fontSize: LayoutTool.setSpText(20),
          },
          style: {
            backgroundColor:'#2F2F30',
          },
          activeBackgroundColor: '#222224',
          inactiveBackgroundColor: '#2F2F30',
        },
      })
    },
    console.disableYellowBox = true  // 禁止Warnings的显示
);


export default createAppContainer(TabNavigator);


const sTabBarOptions = (tabBarItemTitle, tabBarItemDef, tabBarItemSel) =>{
  const tabBarLabel = tabBarItemTitle;
  const tabBarIcon = ({ focused, horizontal, tintColor })=> {
    return !focused ? <Image style = {{width: LayoutTool.scaleSize(64),height: LayoutTool.scaleSize(64)}} source={tabBarItemDef}/>
        : <Image style = {{width: LayoutTool.scaleSize(64),height: LayoutTool.scaleSize(64)}} source={tabBarItemSel}/>
  };

  return {tabBarLabel, tabBarIcon};
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;
