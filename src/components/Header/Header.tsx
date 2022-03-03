import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Switch
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import reactotron from 'reactotron-react-native';
import Colors from '../../utils/colors';
import styles from './Header.styles';

const screenHeight = Dimensions.get('window').height;
interface Props {
    search?: boolean;
    setSearch?: (value: boolean) => void;
    isEnabled?: boolean;
    setLocation?: any;
    isDetails?: boolean;
    toggleSwitch?: () => void;
    city?: string;
}

export default function Header({
    search = false,
    setSearch,
    isEnabled,
    toggleSwitch,
    setLocation,
    isDetails = false,
    city
}: Props) {
    const {goBack} = useNavigation();
    return (
        <>
            {!search ? (
                <>
                    {isDetails ? (
                        <>
                            <TouchableOpacity
                                onPress={() => goBack()}
                                style={styles.buttonArrow}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/icon/arrow.png')}
                                />
                            </TouchableOpacity>
                            <View style={styles.viewCity}>
                                <Text
                                    style={
                                        !isDetails
                                            ? styles.textCity
                                            : styles.textCityDetails
                                    }>
                                    {city}
                                </Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.viewNameCity}>
                                <Text style={styles.textNameCity}>Cidades</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    marginBottom: 12,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: Colors.white,
                                            marginRight: 8
                                        }}>
                                        °C
                                    </Text>
                                    <Switch
                                        trackColor={{
                                            true: Colors.white,
                                            false: Colors.black
                                        }}
                                        thumbColor={
                                            isEnabled
                                                ? Colors.black
                                                : Colors.white
                                        }
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: Colors.white,
                                            marginLeft: 8
                                        }}>
                                        °F
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setLocation({
                                        city: '',
                                        country: ''
                                    });
                                    if (setSearch) setSearch(true);
                                }}
                                style={{
                                    flex: 1,
                                    marginRight: 16,
                                    marginBottom: 16,
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end'
                                }}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/icon/search.png')}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </>
            ) : (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            if (setSearch) setSearch(false);
                        }}
                        style={{
                            marginTop: 55,
                            marginLeft: 16,
                            alignItems: 'flex-start'
                        }}>
                        <Image
                            style={{width: 40, height: 40}}
                            source={require('../../assets/icon/close.png')}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginTop: 55,
                            width: '80%',
                            marginLeft: 8,
                            height: screenHeight
                        }}>
                        <GooglePlacesAutocomplete
                            placeholder="Cidades"
                            onPress={data => {
                                const city =
                                    data.structured_formatting.main_text;
                                const location =
                                    data.structured_formatting.secondary_text;
                                if (location && city) {
                                    setLocation({
                                        city: city,
                                        country: location
                                    });
                                }
                            }}
                            query={{
                                key: 'AIzaSyDGETg3wQG0M3IaMIoVUngnpoJ6yRBAJDg',
                                language: 'pt-br'
                            }}
                            minLength={2}
                            styles={{
                                textInput: {
                                    height: 40,
                                    color: Colors.white,
                                    fontSize: 20,
                                    backgroundColor: Colors.blue
                                }
                            }}
                        />
                    </View>
                </>
            )}
        </>
    );
}
