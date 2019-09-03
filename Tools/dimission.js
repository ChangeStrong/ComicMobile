import { Dimensions } from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

let scaleW = window.width / 505.0;

export default {
     window,
     scaleW
}