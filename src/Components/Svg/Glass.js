import React from 'react';
import Svg, {Rect, Defs, LinearGradient, Stop, Circle} from 'react-native-svg';

const GlassSvg = ({waterLevel}) => {
  // Ensure waterLevel is between 0 and 100
  const clampedWaterLevel = Math.max(0, Math.min(100, waterLevel));

  // Full height of the glass
  const glassHeight = 320;

  // Set a margin (adjust this value to control how much lower the water level is)
  const margin = 25; // You can adjust this value as needed

  // Calculate water height and position
  const waterHeight = (clampedWaterLevel / 100) * (glassHeight - margin); // Max height with margin
  const waterY = glassHeight + 40 - waterHeight; // Position from the top of the glass

  return (
    <Svg width={200} height={400} viewBox="0 0 200 400">
      {/* Glass Body */}
      <Defs>
        <LinearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop
            offset="0%"
            stopColor="rgba(255,255,255,0.2)"
            stopOpacity={0.1}
          />
          <Stop
            offset="100%"
            stopColor="rgba(255,255,255,0.15)"
            stopOpacity={0.2}
          />
        </LinearGradient>
      </Defs>
      <Rect
        x="30"
        y="40"
        width="140"
        height={glassHeight}
        rx="20"
        ry="20"
        fill="url(#glassBodyGrad)"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth={2}
      />
      {/* Water in Glass */}
      <Defs>
        <LinearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="rgba(173,216,230,0.5)" />
          <Stop offset="100%" stopColor="rgba(173,216,230,0.7)" />
        </LinearGradient>
      </Defs>
      <Rect
        x="30"
        y={waterY}
        width="140"
        height={waterHeight}
        rx="20"
        ry="20"
        fill="url(#waterGrad)"
      />
      {/* Surface Bubbles */}
      <Circle cx="60" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />
      <Circle cx="100" cy={waterY} r="3" fill="rgba(255, 255, 255, 0.8)" />
      <Circle cx="140" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />
      {/* Bubbles inside water */}

      {waterHeight > 170 && (
        <>
          <Circle
            cx="110"
            cy={waterY + 50}
            r="5"
            fill="rgba(255, 255, 255, 0.6)"
          />
          <Circle
            cx="90"
            cy={waterY + 70}
            r="3"
            fill="rgba(255, 255, 255, 0.6)"
          />
          <Circle
            cx="100"
            cy={waterY + 90}
            r="2"
            fill="rgba(255, 255, 255, 0.6)"
          />
          <Circle
            cx="120"
            cy={waterY + 110}
            r="4"
            fill="rgba(255, 255, 255, 0.6)"
          />
        </>
      )}
      {/* Glass Highlight */}
      <Rect
        x="40"
        y="50"
        width="20"
        height="300"
        fill="rgba(255, 255, 255, 0.15)"
      />
      <Rect
        x="140"
        y="50"
        width="10"
        height="300"
        fill="rgba(255, 255, 255, 0.05)"
      />
    </Svg>
  );
};

export default GlassSvg;

// import React, {useEffect, useRef} from 'react';
// import {Animated} from 'react-native';
// import Svg, {Rect, Defs, LinearGradient, Stop, Circle} from 'react-native-svg';

// const GlassSvg = ({waterLevel}) => {
//   // Ensure waterLevel is between 0 and 100
//   const clampedWaterLevel = Math.max(0, Math.min(100, waterLevel));

//   // Full height of the glass
//   const glassHeight = 320;

//   // Set a margin (adjust this value to control how much lower the water level is)
//   const margin = 25;

//   // Create an animated value for water height
//   const waterHeight = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Animate water level
//     Animated.timing(waterHeight, {
//       toValue: (clampedWaterLevel / 100) * (glassHeight - margin),
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }, [clampedWaterLevel, waterHeight, glassHeight]);

//   const waterY =
//     glassHeight +
//     40 -
//     waterHeight.interpolate({
//       inputRange: [0, glassHeight - margin],
//       outputRange: [glassHeight + 40, 40],
//     });

//   return (
//     <Svg width={200} height={400} viewBox="0 0 200 400">
//       <Defs>
//         <LinearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//           <Stop
//             offset="0%"
//             stopColor="rgba(255,255,255,0.2)"
//             stopOpacity={0.1}
//           />
//           <Stop
//             offset="100%"
//             stopColor="rgba(255,255,255,0.15)"
//             stopOpacity={0.2}
//           />
//         </LinearGradient>
//       </Defs>
//       <Rect
//         x="30"
//         y="40"
//         width="140"
//         height={glassHeight}
//         rx="20"
//         ry="20"
//         fill="url(#glassBodyGrad)"
//         stroke="rgba(0, 0, 0, 0.3)"
//         strokeWidth={2}
//       />

//       <Defs>
//         <LinearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//           <Stop offset="0%" stopColor="rgba(173,216,230,0.5)" />
//           <Stop offset="100%" stopColor="rgba(173,216,230,0.7)" />
//         </LinearGradient>
//       </Defs>
//       <Animated.Rect
//         x="30"
//         y={waterY}
//         width="140"
//         height={waterHeight}
//         rx="20"
//         ry="20"
//         fill="url(#waterGrad)"
//       />

//       <Circle cx="60" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />
//       <Circle cx="100" cy={waterY} r="3" fill="rgba(255, 255, 255, 0.8)" />
//       <Circle cx="140" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />

//       <Circle cx="110" cy={waterY + 50} r="5" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle cx="90" cy={waterY + 70} r="3" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle cx="100" cy={waterY + 90} r="2" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle
//         cx="120"
//         cy={waterY + 110}
//         r="4"
//         fill="rgba(255, 255, 255, 0.6)"
//       />

//       <Rect
//         x="40"
//         y="50"
//         width="20"
//         height="300"
//         fill="rgba(255, 255, 255, 0.15)"
//       />
//       <Rect
//         x="140"
//         y="50"
//         width="10"
//         height="300"
//         fill="rgba(255, 255, 255, 0.05)"
//       />
//     </Svg>
//   );
// };

// export default GlassSvg;

// import React, {useEffect, useRef} from 'react';
// import {Animated} from 'react-native';
// import Svg, {Rect, Defs, LinearGradient, Stop, Circle} from 'react-native-svg';

// export const GlassSvg = ({waterLevel}) => {
//   // Ensure waterLevel is between 0 and 100
//   const clampedWaterLevel = Math.max(0, Math.min(100, waterLevel));

//   // Full height of the glass
//   const glassHeight = 320;

//   // Set a margin (adjust this value to control how much lower the water level is)
//   const margin = 25;

//   // Create an animated value for water height
//   const waterHeight = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Animate water level
//     Animated.timing(waterHeight, {
//       toValue: (clampedWaterLevel / 100) * (glassHeight - margin),
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }, [clampedWaterLevel, waterHeight, glassHeight]);

//   // Interpolating water Y position based on animated height
//   const waterY = waterHeight.interpolate({
//     inputRange: [0, glassHeight - margin],
//     outputRange: [glassHeight + 40, 40],
//   });

//   return (
//     <Svg width={200} height={400} viewBox="0 0 200 400">
//       <Defs>
//         <LinearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//           <Stop
//             offset="0%"
//             stopColor="rgba(255,255,255,0.2)"
//             stopOpacity={0.1}
//           />
//           <Stop
//             offset="100%"
//             stopColor="rgba(255,255,255,0.15)"
//             stopOpacity={0.2}
//           />
//         </LinearGradient>
//       </Defs>
//       <Rect
//         x="30"
//         y="40"
//         width="140"
//         height={glassHeight}
//         rx="20"
//         ry="20"
//         // fill="url(#glassBodyGrad)"
//         stroke="rgba(0, 0, 0, 0.3)"
//         strokeWidth={2}
//       />

//       <Defs>
//         <LinearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//           <Stop offset="0%" stopColor="rgba(173,216,230,0.5)" />
//           <Stop offset="100%" stopColor="rgba(173,216,230,0.7)" />
//         </LinearGradient>
//       </Defs>
//       <Animated.Rect
//         x="30"
//         y={waterY}
//         width="140"
//         height={waterHeight}
//         rx="20"
//         ry="20"
//         // fill="url(#waterGrad)"
//       />

//       <Circle cx="60" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />
//       <Circle cx="100" cy={waterY} r="3" fill="rgba(255, 255, 255, 0.8)" />
//       <Circle cx="140" cy={waterY} r="2" fill="rgba(255, 255, 255, 0.8)" />

//       <Circle cx="110" cy={waterY + 50} r="5" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle cx="90" cy={waterY + 70} r="3" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle cx="100" cy={waterY + 90} r="2" fill="rgba(255, 255, 255, 0.6)" />
//       <Circle
//         cx="120"
//         cy={waterY + 110}
//         r="4"
//         fill="rgba(255, 255, 255, 0.6)"
//       />

//       <Rect
//         x="40"
//         y="50"
//         width="20"
//         height="300"
//         fill="rgba(255, 255, 255, 0.15)"
//       />
//       <Rect
//         x="140"
//         y="50"
//         width="10"
//         height="300"
//         fill="rgba(255, 255, 255, 0.05)"
//       />
//     </Svg>
//   );
// };
