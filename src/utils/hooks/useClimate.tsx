import {useState} from 'react';
import reactotron from 'reactotron-react-native';

type IProps = {
    city: string;
    units?: string;
    details?: boolean;
};
const keyApi = '1803447f813b6ad87f6d9def3d15d371';

export function useFetchClimateData() {
    const [climateLoading, setClimateLoading] = useState(false);

    const [climateData, setClimateData] = useState();
    const [climateDaily, setClimateDaily] = useState();

    async function fetchClimateApi({city, units = 'metric', details}: IProps) {
        setClimateLoading(true);
        try {
            if (details) {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&lang=pt_br&appid=${keyApi}`
                );
                const json = await response.json();
                setClimateDaily(json.list.slice(0, 5));
            } else {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=pt_br&appid=${keyApi}`
                );
                const json = await response.json();

                setClimateData(json);
            }
            setTimeout(() => {
                setClimateLoading(false);
            }, 2000);
        } catch (error) {
            setClimateLoading(false);
        }
    }

    return {
        climateData,
        fetchClimateApi,
        climateLoading,
        climateDaily
    };
}
