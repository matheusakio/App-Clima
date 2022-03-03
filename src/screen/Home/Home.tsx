import React, {useEffect, useState} from 'react';
import {
    Image,
    Animated,
    Dimensions,
    View,
    Easing,
    FlatList,
    TouchableOpacity
} from 'react-native';

import ButtonCity from '../../components/ButtonCity/ButtonCity';
import Header from '../../components/Header/Header';
import NoCity from '../../components/NoCity/NoCity';
import {useFetchClimateData} from '../../utils/hooks/useClimate';
import Swipeable from 'react-native-swipeable';

import convertFirstCharacterToUppercase from '../../utils/uppercase';

import Loading from '../../components/Loading/Loading';
import Colors from '../../utils/colors';
import reactotron from 'reactotron-react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface ButtonCity {
    city: string;
    country: string;
    status: string;
    maxTemp: number;
    minTemp: number;
    temp: number;
    id: number;
}

export default function SplashScreen() {
    const marginTop = new Animated.Value(0);
    const marginLeft = new Animated.Value(screenWidth);
    const [isEnabled, setIsEnabled] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [search, setSearch] = useState(false);
    const [heart, setHeart] = useState(false);

    const [location, setLocation] = useState({
        city: '',
        country: ''
    });
    const [infoCity, setInfoCity] = useState<ButtonCity[]>([]);
    const {fetchClimateApi, climateData, climateLoading} =
        useFetchClimateData();

    const toggleSwitch = () => setIsEnabled(!isEnabled);

    function changePosition(arr: ButtonCity[], from: number, to: number) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    }

    function handleAddCity() {
        fetchClimateApi({
            city: location.city,
            units: isEnabled ? 'standard' : 'metric'
        });
        setSearch(false);
    }

    async function handleHeart(index: number, heartIndex: boolean) {
        let like = !heartIndex;
        if (like) {
            changePosition(infoCity, 0, index);
        }
        setHeart(!heartIndex);
    }

    const rightButtons = (index: number) => [
        <TouchableOpacity
            onPress={() => {
                let aux = [...infoCity];
                aux.splice(index, 1);
                setInfoCity(aux);
            }}
            style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor: Colors.red,
                marginTop: 16
            }}>
            <Image
                style={{
                    marginLeft: 20,
                    width: 30,
                    height: 30
                }}
                source={require('../../assets/icon/bin.png')}
            />
        </TouchableOpacity>
    ];

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(marginTop, {
                toValue: -screenHeight + 100,
                duration: 2000,
                useNativeDriver: true
            }).start(() => {
                setAnimated(true);
            });
        }, 700);
    }, []);

    useEffect(() => {
        if (climateData?.main) {
            return setInfoCity([
                ...infoCity,
                {
                    city: location.city,
                    country: location.country,
                    status:
                        convertFirstCharacterToUppercase(
                            climateData?.weather[0].description
                        ) ?? '',
                    minTemp: Math.floor(climateData?.main.temp_min),
                    maxTemp: Math.floor(climateData?.main.temp_max),
                    temp: Math.floor(climateData?.main.temp),
                    id: Math.random()
                }
            ]);
        }
    }, [climateData]);

    useEffect(() => {
        if (animated || !climateLoading) {
            Animated.timing(marginLeft, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.bounce
            }).start();
        }
    }, [animated, climateLoading]);

    if (climateLoading) {
        return <Loading loading={climateLoading} />;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.grey
            }}>
            {animated ? (
                <View>
                    <View
                        style={{
                            width: screenWidth,
                            height: 100,
                            flexDirection: 'row',
                            backgroundColor: Colors.blue
                        }}>
                        <Animated.View
                            style={{
                                flex: 1,
                                width: screenWidth,
                                height: 100,
                                flexDirection: 'row',
                                backgroundColor: Colors.blue,
                                transform: [{translateX: marginLeft}]
                            }}>
                            <Header
                                search={search}
                                setSearch={setSearch}
                                setLocation={setLocation}
                                isEnabled={isEnabled}
                                toggleSwitch={toggleSwitch}
                                city={location.city}
                            />
                        </Animated.View>
                    </View>
                    {search ? (
                        <>
                            {location.city ? (
                                <ButtonCity
                                    search={search}
                                    title={location.city}
                                    subTitle={location.country}
                                    handleAddCity={handleAddCity}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            {infoCity.length > 0 && !!infoCity[0].temp ? (
                                <FlatList
                                    data={infoCity}
                                    renderItem={({item, index}) => (
                                        <Swipeable
                                            rightButtons={rightButtons(index)}>
                                            <ButtonCity
                                                isEnabled={isEnabled}
                                                onPressHeart={() => {
                                                    handleHeart(index, heart);
                                                }}
                                                search={search}
                                                handleAddCity={handleAddCity}
                                                title={item?.city}
                                                heart={heart}
                                                subTitle={item?.country}
                                                temp={item?.temp}
                                                tempMax={item?.maxTemp}
                                                tempMin={item?.minTemp}
                                                description={item?.status}
                                            />
                                        </Swipeable>
                                    )}
                                />
                            ) : (
                                <NoCity />
                            )}
                        </>
                    )}
                </View>
            ) : (
                <Animated.View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',

                        backgroundColor: Colors.blue,
                        transform: [{translateY: marginTop}]
                    }}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={require('../../assets/logo/meteorology.png')}
                    />
                </Animated.View>
            )}
        </View>
    );
}
