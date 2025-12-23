import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export const MplayVideoinfoShimmer = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.7, { duration: 1000 }), withTiming(0.3, { duration: 1000 })),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <View className="bg-dark-default flex-1">
      <View className="w-full h-[235px] bg-black rounded-sm flex items-center justify-center">
        <ActivityIndicator size="large" color="#00D679" />
      </View>

      <View className="mt-[20px] items-center">
        <Animated.View style={animatedStyle} className="bg-gray-600 rounded h-12 w-[300px] mb-4" />
        <Animated.View style={animatedStyle} className="bg-gray-600 rounded h-12 w-[300px]" />
      </View>

      <Animated.View
        style={animatedStyle}
        className="bg-gray-600 rounded h-4 w-[300px] mt-6 ml-4"
      />

      <Animated.View
        style={animatedStyle}
        className="bg-gray-600 rounded h-8 w-[130px] mt-4 ml-4"
      />

      {Array.from({ length: 4 }).map((_, i) => (
        <View key={`row-${i}`} className="flex-row justify-between mt-2.5">
          <Animated.View style={animatedStyle} className="bg-gray-600 rounded h-4 w-[100px] ml-4" />
          <View className="flex-1">
            <Animated.View
              style={animatedStyle}
              className="bg-gray-600 rounded h-4 w-[100px] ml-10"
            />
          </View>
        </View>
      ))}
    </View>
  );
};