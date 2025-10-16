import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { reduxStorage } from '../../../Redux/mmkv';

const TestScreen = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [initialPosLoaded, setInitialPosLoaded] = useState(false);

    // Load saved position
    useEffect(() => {
        const loadPosition = async () => {
            try {
                const pos = await reduxStorage.getItem('boxPosition');
                if (pos) {
                    const { x, y } = JSON.parse(pos);
                    pan.setValue({ x, y });
                }
            } catch (e) {
                console.error('Failed to load position', e);
            } finally {
                setInitialPosLoaded(true);
            }
        };

        loadPosition();
    }, []);

    // Save position to AsyncStorage
    const savePosition = async (x, y) => {
        try {
            await reduxStorage.setItem('boxPosition', JSON.stringify({ x, y }));
        } catch (e) {
            console.error('Failed to save position', e);
        }
    };

    // Handle pan gesture
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                savePosition(pan.x._value, pan.y._value);
            },
        })
    ).current;

    if (!initialPosLoaded) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TestScreen</Text>

            <Animated.View
                style={[styles.box, pan.getLayout()]}
                {...panResponder.panHandlers}
            />
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'tomato',
        position: 'absolute',
        borderRadius: 10,
    },
});
