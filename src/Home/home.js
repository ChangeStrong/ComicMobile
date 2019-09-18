import React, {Component} from 'react'
import Dimen from  './../../Tools/dimission'
import Banner from './../Common/Banner';
import ProductDetail from './ProductDetail/ProductDetail';
import {HomeProductList} from './homeProductList'
import LayoutTool, {STATUSBAR_HEIGHT} from './../../Tools/Layout';
import PTRControl from 'react-native-ptr-control';

let scale = Dimen.scaleW;

import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView,
TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

var viewTypes = {
    home:0,
    productDetail:1,
}
var listObjet = null;
export class HomeView extends Component{
    static navigationOptions = {
        title:'主页'
    }
    constructor(props){
        super(props);
        console.log('Home- enter main page.');
        this.state = {
            currentViewType: viewTypes.home,
            currentTitleIndex:0,
            refreshing: false,
        };
        this._onPressBannerItem = this._onPressBannerItem.bind(this);
        this.headRefreshDon = this.headRefreshDon.bind(this);
    }

    _onPressButton(index){
        console.log('点击了按钮'+index)
        this.setState({
            currentTitleIndex:index
        })
    }

    _onPressBannerItem(item){
        console.log(item);
        console.log(item.id);
        // this.setState({
        //     currentViewType: viewTypes.productDetail,
        // })
        //跳转作品详情页
        this.props.navigation.navigate('HomeProductDetailVC',{productId:item.id})
    }

    headRefreshDon(){
        PTRControl.headerRefreshDone()
    }

    render(){
       console.log("home render function.");
       //标题
       let  titles = ['全部','少女','少年'];
       let titlesViews = (
           titles.map((item,index)=>{
               return (
                  <TouchableOpacity onPress={()=>{this._onPressButton(index)}}
                                   key={index} >
                   <Text style={this.state.currentTitleIndex == index?styles.titleActive:styles.titleItem}>
                       {item}
                     </Text>
                  </TouchableOpacity>
               )
       })
       )
        if (this.state.currentViewType === viewTypes.home){
            return(

                <View style={styles.container} >

                    <View style={styles.titleBgView}>
                        {titlesViews}
                    </View>
                    <PTRControl
                        //here is the origin props of ScrollView
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                        //here is the props of lib provide
                        scrollComponent={'ScrollView'}
                        enableFooterInfinite={false}
                        onHeaderRefreshing={()=>{
                            console.log('下拉刷新中..');
                            //请求数据
                            listObjet.getData();
                        }}
                    >
                    <Banner onPressItem={this._onPressBannerItem}>
                    </Banner>
                    <HomeProductList ref={(view)=>{
                        listObjet = view;
                        HomeProductList.loadingDidCreate(view)
                    }}

                      headRefreshDone={this.headRefreshDon}
                    >
                    </HomeProductList>




                    </PTRControl>
                </View>

            )
        }else if (this.state.currentViewType === viewTypes.productDetail){
          return (
              <ProductDetail>

             </ProductDetail>
          )
        }else {
            return (<Text> No this page</Text>);
        }


   }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:STATUSBAR_HEIGHT,
    },
    scroll:{
      width:Dimen.window.width,
    },
  titleBgView:{
      backgroundColor:'white',
      width:'100%',
      height:40*scale,
      flexDirection:'row',
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center'
  },
    titleItem: {
        // backgroundColor: 'green',
        width: 60 * scale,
        textAlign: 'center',
        lineHeight:40*scale,
        marginRight:10
    },
    titleActive: {
        // backgroundColor: 'yellow',
        width: 60 * scale,
        textAlign: 'center',
        fontSize:18,
        color: 'red',
        // lineHeight:40*scale,
        marginRight:10
    },

})
