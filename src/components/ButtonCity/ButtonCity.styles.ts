import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

export default StyleSheet.create({
    screen: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 1,

        flexDirection: 'row',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1,
        marginLeft: 16,
        marginTop: 16,
        alignItems: 'flex-start',
        flexDirection: 'column'
    }
});
