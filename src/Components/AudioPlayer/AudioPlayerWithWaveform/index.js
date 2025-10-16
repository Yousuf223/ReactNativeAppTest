// import {Audio} from 'expo-av';
// import {useEffect, useState, useRef} from 'react';
// import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native';
// import Svg, {Line} from 'react-native-svg';
// import MyIcons from '../../MyIcons';
// import PoppinsRegular from '../../wrappers/Texts/PoppinsRegular';
// import {generateWaveformArray} from '../../../Functions/generateRandomImages';

// export default function AudioPlayerWithWaveform({audioFile}) {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState('00:00');
//   const [currentPosition, setCurrentPosition] = useState('00:00');
//   const [currentPositionMillis, setCurrentPositionMillis] = useState(0);
//   const [durationMillis, setDurationMillis] = useState(0);

//   const generatedWaveform = generateWaveformArray(32);
//   const [waveform, setWaveform] = useState(generatedWaveform);
//   const waveformInterval = useRef(null);

//   // Play sound function
//   async function playSound() {
//     console.log('Loading Sound');
//     const {sound} = await Audio.Sound.createAsync(audioFile);
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync();
//     setIsPlaying(true);

//     sound.setOnPlaybackStatusUpdate(status => {
//       if (status.isLoaded) {
//         if (status.isPlaying) {
//           setCurrentPositionMillis(status.positionMillis); // Update current playback position
//           setDurationMillis(status.durationMillis || 0); // Update total duration
//           setCurrentPosition(formatTime(status.positionMillis));
//           setDuration(formatTime(status.durationMillis || 0));
//         }

//         if (status.didJustFinish) {
//           setIsPlaying(false); // Stop when audio finishes
//           resetWaveform(); // Reset waveform when audio finishes
//         }
//       }
//     });

//     startWaveformAnimation(); // Start waveform animation
//   }

//   // Stop sound function
//   async function stopSound() {
//     if (sound) {
//       console.log('Stopping Sound');
//       await sound.stopAsync(); // Stop the sound
//       setIsPlaying(false); // Set playing state to false
//       resetWaveform(); // Reset waveform
//       setCurrentPositionMillis(0); // Reset the current position to 0
//       setCurrentPosition('00:00'); // Reset the time display
//     }
//   }

//   // Function to start the waveform animation
//   const startWaveformAnimation = () => {
//     if (!waveformInterval.current) {
//       waveformInterval.current = setInterval(() => {
//         setWaveform(prevWaveform => {
//           const newWaveform = [
//             ...prevWaveform.slice(1),
//             Math.floor(Math.random() * 50) + 10,
//           ];
//           return newWaveform;
//         });
//       }, 100); // Update every 100ms
//     }
//   };

//   // Function to stop the waveform animation
//   const stopWaveformAnimation = () => {
//     if (waveformInterval.current) {
//       clearInterval(waveformInterval.current);
//       waveformInterval.current = null;
//     }
//   };

//   // Function to reset the waveform to the initial state
//   const resetWaveform = () => {
//     stopWaveformAnimation(); // Stop the animation
//     setWaveform(generatedWaveform); // Reset waveform to the initial state
//   };

//   // Handle back button press to stop sound
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       () => {
//         stopSound(); // Stop the sound when back button is pressed
//         return false; // Let the system handle the default behavior
//       },
//     );

//     return () => {
//       backHandler.remove();
//       stopWaveformAnimation(); // Ensure animation is stopped
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   // Format time in MM:SS format
//   const formatTime = millis => {
//     const minutes = Math.floor(millis / 60000);
//     const seconds = Math.floor((millis % 60000) / 1000);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   // Render the waveform
//   const renderWaveform = () => {
//     const stepWidth = 8;
//     const centerY = 25; // Middle point of the waveform (half of 50)

//     // Calculate the current progress percentage
//     const playedWaveformIndex = Math.floor(
//       (currentPositionMillis / (durationMillis || 1)) * waveform.length,
//     );

//     return (
//       <Svg height="50" width={stepWidth * waveform.length}>
//         {waveform.map((value, index) => {
//           const halfValue = value / 2; // Calculate the top and bottom scaling
//           return (
//             <Line
//               key={index}
//               x1={index * stepWidth}
//               y1={centerY - halfValue}
//               x2={index * stepWidth}
//               y2={centerY + halfValue}
//               stroke={index <= playedWaveformIndex ? 'black' : 'lightgray'} // Dark for played portion, light for remaining
//               strokeWidth="2"
//             />
//           );
//         })}
//       </Svg>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.playerWrapper}>
//         <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
//           <View style={styles.playButton}>
//             <MyIcons
//               name={isPlaying ? 'playBlue' : 'pauseBlue'}
//               size={32}
//               color="white"
//             />
//           </View>
//         </TouchableOpacity>
//         <View style={styles.waveformContainer}>{renderWaveform()}</View>
//         <View style={styles.timeContainer}>
//           <View style={styles.durationBox}>
//             <PoppinsRegular
//               text={duration}
//               style={{fontSize: 14, color: 'white'}}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingVertical: 10,
//   },
//   playerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eaeaea',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   playButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   waveformContainer: {
//     marginHorizontal: 10,
//     flex: 1,
//     overflow: 'hidden',
//   },
//   timeContainer: {
//     justifyContent: 'flex-end',
//   },
//   durationBox: {
//     backgroundColor: '#87ceeb',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//   },
// });
