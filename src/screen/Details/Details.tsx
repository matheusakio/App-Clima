import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
    Image,
    Animated,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Easing,
    FlatList
} from 'react-native';
import reactotron from 'reactotron-react-native';
import {format, addDays, getDaysInMonth, addMonths} from 'date-fns';
import ButtonCity from '../../components/ButtonCity/ButtonCity';
import Header from '../../components/Header/Header';
import {useFetchClimateData} from '../../utils/hooks/useClimate';
import pt from 'date-fns/locale/pt-BR';
import convertFirstCharacterToUppercase from '../../utils/uppercase';
import Loading from '../../components/Loading/Loading';
import Colors from '../../utils/colors';

const screenWidth = Dimensions.get('window').width;

type ParamList = {
    Details: {city: string; units: string};
};

export default function DetailsScreen() {
    const route = useRoute<RouteProp<ParamList, 'Details'>>();
    const {climateDaily, fetchClimateApi, climateLoading} =
        useFetchClimateData();

    useEffect(() => {
        fetchClimateApi({
            city: route.params?.city,
            details: true,
            units: route.params?.units ? 'standard' : 'metric'
        });
    }, []);

    if (climateLoading) {
        return <Loading loading={climateLoading} />;
    }

    function daysWeek(index: number) {
        if (index === 0) {
            return 'Hoje';
        }
        if (index === 1) {
            return 'Amanhã';
        }
        const date = addDays(new Date(), index);

        const dateName = format(date, 'EEEE', {locale: pt});
        return dateName;
    }
    function daysMonth(index: number) {
        const day = addDays(new Date(), index);
        let month = format(new Date(), 'MMMM', {locale: pt});
        const numberDay = format(day, 'dd', {locale: pt});
        const daysInt = parseInt(numberDay);
        const numberMonth = getDaysInMonth(new Date());

        if (daysInt === numberMonth) {
            const nextMonth = addMonths(new Date(), 1);

            month = format(nextMonth, 'MMMM', {locale: pt});
        }
        return `${numberDay} de ${month}`;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.grey
            }}>
            <View>
                <View
                    style={{
                        width: screenWidth,
                        height: 100,
                        flexDirection: 'row',
                        backgroundColor: Colors.blue
                    }}>
                    <View
                        style={{
                            flex: 1,
                            width: screenWidth,
                            height: 100,
                            flexDirection: 'row',
                            backgroundColor: Colors.blue
                        }}>
                        <Header isDetails city={route.params?.city} />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 16
                    }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: Colors.black,
                            textAlign: 'center',
                            fontFamily: 'Roboto-Regular'
                        }}>
                        Previsão dos próximos 5 dias
                    </Text>
                </View>

                <>
                    {climateDaily && (
                        <FlatList
                            data={climateDaily}
                            renderItem={({item, index}) => (
                                <ButtonCity
                                    title={
                                        convertFirstCharacterToUppercase(
                                            daysWeek(index)
                                        ) ?? ''
                                    }
                                    subTitle={daysMonth(index)}
                                    details
                                    temp={Math.floor(item.main.temp)}
                                    tempMin={Math.floor(item.main.temp_min)}
                                    tempMax={Math.floor(item.main.temp_max)}
                                    description={convertFirstCharacterToUppercase(
                                        item.weather[0].description
                                    )}
                                />
                            )}
                        />
                    )}
                </>
            </View>
        </View>
    );
}
