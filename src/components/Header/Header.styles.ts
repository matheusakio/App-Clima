import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

export default StyleSheet.create({
    buttonArrow: {
        marginTop: 60,
        marginLeft: 16,
        alignItems: 'flex-start'
    },
    image: {
        width: 20,
        height: 20
    },
    viewCity: {
        flex: 1,
        marginTop: 60,
        marginLeft: 40
    },
    viewNameCity: {
        marginLeft: 16,
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    textNameCity: {
        fontSize: 20,
        color: Colors.white,
        fontFamily: 'Roboto-Regular'
    },
    textCity: {
        fontSize: 16,
        color: Colors.white,
        fontFamily: 'Roboto-Regular'
    },
    textCityDetails: {
        fontSize: 20,
        color: Colors.white,
        fontFamily: 'Roboto-Regular'
    }
});
