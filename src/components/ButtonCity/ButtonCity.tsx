import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import reactotron from 'reactotron-react-native';
import Colors from '../../utils/colors';
import styles from './ButtonCity.styles';

interface Props {
    search?: boolean;
    title: string;
    subTitle: string;
    handleAddCity?: any;
    onPressHeart?: any;
    heart?: boolean;
    isEnabled?: boolean;
    details?: boolean;
    tempMax?: number;
    tempMin?: number;
    temp?: number;
    description?: string;
}

export default function ButtonCity({
    search,
    title,
    subTitle,
    handleAddCity,
    onPressHeart,
    heart,
    details = false,
    tempMax,
    tempMin,
    description,
    isEnabled,
    temp
}: Props) {
    const {navigate} = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigate('Details', {city: title, units: isEnabled})}
            disabled={search}
            style={styles.screen}>
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: 'Roboto-Regular'
                    }}>
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular'
                    }}>
                    {subTitle}
                </Text>
                {!search ? (
                    <View
                        style={{
                            marginVertical: 16
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Roboto-Regular',
                                color: Colors.orange
                            }}>
                            {description}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Roboto-Regular'
                            }}>
                            {tempMin}º - {tempMax}º
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={handleAddCity}
                        style={{
                            marginBottom: 16,
                            marginTop: 30
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: Colors.blueDark,
                                fontFamily: 'Roboto-Medium'
                            }}>
                            ADICIONAR
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {!search && (
                <View
                    style={{
                        flex: 1,
                        marginRight: 8,
                        marginVertical: 16,
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                    <Text
                        style={{
                            fontSize: 34,
                            color: Colors.orange,
                            fontFamily: 'Roboto-Regular'
                        }}>
                        {temp}º
                    </Text>
                    {!details && (
                        <TouchableOpacity onPress={onPressHeart}>
                            <Image
                                style={{width: 55, height: 55}}
                                source={
                                    heart
                                        ? require('../../assets/icon/enable.png')
                                        : require('../../assets/icon/disable.png')
                                }
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}
