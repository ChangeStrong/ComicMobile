import Swiper from 'react-native-swiper'
import Dimen from  './../../Tools/dimission'
import React, { Component } from 'react';
import {AppRegistry, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {POST} from '../../Tools/HttpUtil';
import * as HttpConfig from '../../Tools/HttpConfig';

let scale = Dimen.scaleW;
const {ScreenWidth, ScreenHeight} = Dimensions.get('window');
export default class Banner extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow: false,
            items:[]
        }
    }

    _onPressBannerItem(index){
        console.log('点击了Banner2按钮'+index);
        // this.props.onPressItem(index);
    }

    render() {
        let H = 200;
        if (this.state.isShow) {
            return(
                <View style={{height: H, alignItems:'center', backgroundColor:'blue'}}>

                    <Swiper style={styles.banner} autoplay = {true} height = {H}
                            // width={Dimen.window.width}
                            showsPagination = {true} dotColor="white"
                            activeDotColor='yellow' horizontal={true} >
                        {
                            this.state.items.map((item,index)=>{
                             return (<View key={index} style={styles.bannerItemBg}>
                                 <TouchableOpacity onPress={() =>this.props.onPressItem(item)}>
                                 <Image style={{height: H, width:Dimen.window.width, backgroundColor:'green'}}
                                        key = {0} resizeMode='cover' source={{uri: item.thumUrl}}/>
                                 </TouchableOpacity>
                             </View>)
                            })
                        }
                    </Swiper>

                </View>
            );
        }else {
            return(
                <View style={{height:H, width: ScreenWidth, backgroundColor:'green'}}/>
            );
        }
    }


    componentDidMount(): void {
        let params = {
            pageNumber:1,
            pageSize:1,
        }
        POST(HttpConfig.kBannerList,params,(response) => {
            console.log(response);
            if (response.code === 0){
                // console.log(response);
        console.log(response.data.list);
                //更新界面
                this.setState({
                    isShow: true,
                    items:response.data.list
                })
            }
        })
    }

}


const styles = StyleSheet.create({
    banner: {
        width: Dimen.window.width,
        height:220, backgroundColor: 'red'},
    bannerItemBg:{
        width: Dimen.window.width,
        height: 220,
        backgroundColor:'yellow',
    }

})



