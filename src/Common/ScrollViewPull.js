import React from 'react';
import {
    ScrollView,
    RefreshControl, StyleSheet, PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';


class ScrollViewPull extends React.Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        style:PropTypes.object, // 样式
        refreshing:PropTypes.bool.isRequired,//是否开始下拉刷新动画
        refreshBegin: PropTypes.func,// 开始下拉刷新回调
        scrollEnd: PropTypes.func,// 触底回调
    };

    constructor(props) {
        super(props);
        this.initState();
    }


    initState=()=>{

    };

    onRefresh = () => {
        this.props.refreshBegin();
    };

    // 监听上拉触底
    _contentViewScroll = (e: Object) => {
        let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        console.log('offsetY='+offsetY);
        let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        console.log('offsetY='+offsetY
            +' contentSize='+e.nativeEvent.contentSize
            + ' scrollSize='+e.nativeEvent.layoutMeasurement);
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            this.props.scrollEnd();
        }
    };

    // onScroll(e){
    //     let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    //     console.log('offsetY2='+offsetY);
    // }
    componentWillMount(): void {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            //只要移动事件前面两个必须为false
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                console.log('moveY='+gestureState.dy)
// 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                console.log('手势结束')
            },
            onPanResponderEnd:(evt,gestureState)=>{
                console.log('手势结束end')
            },
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('异常结束')
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }

    render() {
        const {children,refreshing,style} = this.props;
        return (
            <ScrollView
                style={[{flex:1},style]}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
                onMomentumScrollEnd = {this._contentViewScroll}
                // onScroll={this.onScroll}
                {...this._panResponder.panHandlers}
            >
                {children}
            </ScrollView>
        );
    }
}

export default ScrollViewPull;

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop:40,
    }
})
