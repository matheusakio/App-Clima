import React, {useCallback, useEffect, useMemo} from 'react';
import {Animated, BackHandler, Image, View} from 'react-native';

import styles from './Loading.styles';

export default function Loading(loading: boolean) {
    const opacity = useMemo(() => new Animated.Value(200), []);

    const handleBack = useCallback(() => loading, [loading]);

    const loopAnimationDown: () => void = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 200,
            duration: 500,
            useNativeDriver: false
        }).start(o => {
            if (o.finished) {
                loopAnimationUp();
            }
        });
    }, [loopAnimationUp, opacity]);

    const loopAnimationUp: () => void = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 50,
            duration: 700,
            useNativeDriver: false
        }).start(o => {
            if (o.finished) {
                loopAnimationDown();
            }
        });
    }, [loopAnimationDown, opacity]);

    useEffect(() => {
        loopAnimationDown();
    }, [loading, loopAnimationDown]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBack);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBack);
        };
    }, [handleBack]);

    const animatedStyles = {
        opacity: opacity.interpolate({
            inputRange: [1, 200],
            outputRange: [0, 1]
        })
    };

    return (
        <View style={styles.container}>
            <Animated.View style={animatedStyles}>
                <Image
                    style={{width: 200, height: 200}}
                    source={require('../../assets/logo/meteorology.png')}
                />
            </Animated.View>
        </View>
    );
}
