import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import reactotron from 'reactotron-react-native';

export function useAsyncStorageData() {
    const [storageLoaging, setStorageLoading] = useState(false);

    async function storeSetData(value: any) {
        setStorageLoading(true);
        try {
            const arrayCity = JSON.stringify(value);
            await AsyncStorage.setItem('@storage_Key', arrayCity);
            setStorageLoading(false);
        } catch (e) {
            setStorageLoading(false);
        }
    }
    async function storeGetData() {
        setStorageLoading(true);
        try {
            const value = await AsyncStorage.getItem('@storage_Key');

            if (value !== null) {
                const arrayCities = JSON.parse(value);
                return arrayCities;
            }
            setStorageLoading(false);
        } catch (error) {
            setStorageLoading(false);
        }
    }

    return {
        storageLoaging,
        storeSetData,
        storeGetData
    };
}
