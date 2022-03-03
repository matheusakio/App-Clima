import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../utils/colors';

export default function NoCity() {
    return (
        <View
            style={{
                marginTop: 60,
                alignItems: 'center'
            }}>
            <View
                style={{
                    marginTop: 16,
                    marginHorizontal: 30
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: Colors.black,
                        textAlign: 'center',
                        fontFamily: 'Roboto-Regular',
                        fontWeight: 'bold'
                    }}>
                    Parece que você ainda não adicionou uma cidade
                </Text>
            </View>
            <View
                style={{
                    marginTop: 16,
                    marginHorizontal: 16
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Regular',
                        color: Colors.black,
                        textAlign: 'center'
                    }}>
                    Tente adicionar uma cidade usando o botão de busca
                </Text>
            </View>
        </View>
    );
}
