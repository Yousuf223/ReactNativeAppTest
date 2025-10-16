// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Modal,
//   ScrollView,

// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { FlashList } from '@shopify/flash-list';
// import Image from 'react-native-fast-image';
// import CustomHeader from '../../../Components/CustomHeader';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import { MainButton } from '../../../Components/Buttons/MainButton';
// import ModalComponent from '../../../Components/ModalComponent';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import fonts from '../../../Assets/fonts';
// import { appImages } from '../../../Assets/Images';
// import { colors } from '../../../theme/colors';
// import { font, spacing } from '../../../theme/styles';
// import { styles } from './styles';
// import routes from '../../../Navigation/routes';
// import { LOG } from '../../../Utils/helperFunction';
// import { imageServer } from '../../../Api/configs';
// import { vh, vw } from '../../../theme/units';
// import {
//   recordsApi,
//   useDeleteRecordsMutation,
// } from '../../../Api/recordsApiSlice';
// import { executeApiRequest } from '../../../Api/methods/method';
// import { persistor } from '../../../Redux/store';
// import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
// import { useDispatch } from 'react-redux';
// import { autopartsApi } from '../../../Api/autopartsApiSlice';
// import { gasApi } from '../../../Api/gasApiSlice';
// import { accidentApi } from '../../../Api/accidentApiSlice';
// import { travelApi } from '../../../Api/travelApiSlice';
// import { maintenanceAutopartsApi } from '../../../Api/mainteinanceAutopartsApiSlice';
// import { equipmentApi } from '../../../Api/equipmentApiSlice';
// import { petApi } from '../../../Api/petApiSlice';
// import { vetApi } from '../../../Api/vetApiSlice';
// import EmptyDataComponent from '../../../Components/EmptyDataComponent';

// const formatKeyToTitle = key => {
//   return key
//     .replace(/([A-Z])/g, ' $1') // camelCase to space
//     .replace(/[_\[\]\.]/g, ' ') // remove symbols
//     .replace(/\s+/g, ' ')
//     .trim()
//     .replace(/^./, str => str.toUpperCase());
// };

// const normalizeData = (data, parentKey = '') => {
//   const normalized = [];

//   // If array, iterate over each item
//   if (Array.isArray(data)) {
//     data.forEach((item, index) => {
//       const newKey = `${parentKey}[${index}]`;
//       if (typeof item === 'object' && item !== null) {
//         normalized.push(...normalizeData(item, newKey));
//       } else {
//         normalized.push({
//           id: newKey,
//           title: `${formatKeyToTitle(parentKey)} ${index + 1}`,
//           detail: item.toString(),
//         });
//       }
//     });
//     return normalized;
//   }

//   // If plain object
//   if (typeof data === 'object' && data !== null) {
//     Object.entries(data).forEach(([key, value]) => {
//       const fullKey = parentKey ? `${parentKey}.${key}` : key;

//       if (
//         value !== null &&
//         value !== undefined &&
//         key !== '__v' &&
//         key !== '_id' &&
//         key !== 'userId' &&
//         key !== 'createdAt' &&
//         key !== 'updatedAt' &&
//         key !== 'vehicleId' &&
//         key !== 'store' &&
//         key !== 'vehicleId' &&
//         key !== 'petId' &&
//         key !== 'mechanicId' &&
//         key !== 'sellerId' &&
//         key !== 'storeId' &&
//         key !== 'wordkerId' &&
//         key !== 'notes' &&
//         key !== 'gallery' &&
//         key !== 'autoPartIds' &&
//         key !== 'autoParts' &&
//         key !== 'attachments' &&
//         key !== 'fieldId' &&
//         key !== 'categoryId' &&
//         key !== 'type' &&
//         key !== 'label'
//       ) {
//         let detail = value;

//         // Handle known nested keys with special formatting
//         if (typeof value === 'object' && !Array.isArray(value)) {
//           if (key === 'pet' && value.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Pet Name',
//               detail: value.name,
//             });
//           } else if (key === 'mechanic' && value.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Mechanic Name',
//               detail: value.name,
//             });
//           } else if (key === 'store' && value.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Store Name',
//               detail: value.name,
//             });
//           } else if (key === 'vehicle' && value.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Vehicle Name',
//               detail: value.name,
//             });
//           } else {
//             // Recursively normalize nested object
//             normalized.push(...normalizeData(value, fullKey));
//           }
//           return;
//         }

//         // If it's an array
//         if (Array.isArray(value)) {
//           normalized.push(...normalizeData(value, fullKey));
//           return;
//         }

//         // Format special values
//         if (key.toLowerCase().includes('date')) {
//           detail = new Date(value).toLocaleDateString();
//         } else if (
//           key.toLowerCase().includes('expense') ||
//           key.toLowerCase().includes('cost') ||
//           key === 'price' ||
//           key === 'payment' ||
//           key === 'totalPrice'
//         ) {
//           detail = `$ ${value}`;
//         }

//         normalized.push({
//           id: fullKey,
//           title: formatKeyToTitle(key),
//           detail: detail.toString(),
//         });
//       }
//     });
//   }

//   return normalized;
// };

// // Data Renderer
// const DataRenderer = ({ item }) => {
//   return (
//     <View>
//       <CustomText
//         text={item.title}
//         color={colors.text.light}
//         size={font.medium}
//         font={fonts.benzin.semibold}
//         style={{ width: vw * 27 }}
//         numberOfLines={2}
//       />
//       <CustomText
//         text={item.detail}
//         color={colors.text.dimBlack}
//         size={font.medium}
//         font={fonts.benzin.regular}
//       />
//     </View>
//   );
// };

// const getAttachments = item => {
//   console.log('itemitem', item?.attachments)
//   // Check for attachments in three possible locations
//   const attachmentsSource =
//     item?.attachments ||
//     item?.partDetails?.attachments ||
//     item?.repairPartDetails?.attachments ||
//     [];

//   // Map the attachments to the desired format
//   const attachments =
//     attachmentsSource.length > 0
//       ? attachmentsSource.map((img, index) => {
//         // Check if img is a string (URL) or object
//         const imageUrl =
//           typeof img === 'string' ? `${imageServer}${img}` : appImages.scan1; // Fallback to default if not a string
//         return { id: index, image: { uri: imageUrl } };
//       })
//       : [
//         // I change it because of issues
//         // { id: 1, image: appImages.placeholder },
//         // { id: 2, image: appImages.placeholder },
//       ];

//   return attachments;
// };

// const AutoPartsDetails = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { selectedMechanic, item } = route.params; // item is the selected record
//   LOG('SELECTED: ', selectedMechanic);
//   LOG('itemitemdkjjddjk: ', item);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isModalVisible1, setModalVisible1] = useState(false);

//   const [isLoading1, setIsLoading1] = useState(false);
//   const dispatch = useDispatch();
//   const [deleteRecords, { isLoading }] = useDeleteRecordsMutation();
//   LOG('Item', item);
//   const extractRequiredData = item => {
//     if (!item) return null;

//     const { vehicle, vehicleDetails, ...rest } = item;

//     const filteredData = {
//       ...rest,
//       make: vehicle?.vehicleDetails?.make || vehicleDetails?.make || null,
//     };

//     console.log('filteredData', filteredData);

//     return filteredData;
//   };

//   const result = extractRequiredData(item);
//   LOG('RESULT: ', result);

//   // Here I add code for fixing custom category issue for showing label corectly
//   let dataToShow = [];

//   if (result?.data && item?.category?.fields) {
//     // This is a custom record — manually map data array using category.fields
//     const fieldMap = {};
//     item.category.fields.forEach(field => {
//       fieldMap[field._id] = field.label;
//     });

//     dataToShow = result.data.map((entry, index) => {
//       const fieldLabel = fieldMap[entry.fieldId] || `Field ${index + 1}`;
//       let detailValue = entry.value;

//       // Optional: format if it's a date-like value
//       if (
//         typeof entry.value === 'string' &&
//         entry.value.match(/^\d{4}-\d{2}-\d{2}T/)
//       ) {
//         detailValue = new Date(entry.value).toLocaleDateString();
//       }

//       return {
//         id: entry.fieldId,
//         title: fieldLabel,
//         detail: detailValue,
//       };
//     });

//     LOG('CUSTOM DATA TO SHOW:', dataToShow);
//   } else {
//     // fallback for non-custom records
//     dataToShow = normalizeData(result || {});
//   }

//   console.log('dataToShow', dataToShow);

//   // const dataToShow = normalizeData(result || {});
//   // console.log('dataToShow', dataToShow)

//   console.log(item, 'itemitemisstemitem')

//   const attachments = getAttachments(item);
//   LOG('Attachments: ', attachments);

//   const openModal = image => {
//     setSelectedImage(image);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedImage(null);
//   };

//   const capitalizeFirstLetter = text => {
//     if (!text) return '';
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };

//   const handleDelete = async () => {
//     LOG('TYPE SENT ON API: ', selectedMechanic);
//     const response = await executeApiRequest({
//       apiCallFunction: deleteRecords,
//       params: {
//         id: item?._id, // for the URL
//         type: selectedMechanic, // for the query param
//       },
//       toast: true,
//       timeout: 30000,
//     });

//     LOG('Delete Success:', response);
//     if (response) {
//       setModalVisible1(false);
//       setTimeout(async () => {
//         dispatch(autopartsApi.util.resetApiState());
//         dispatch(gasApi.util.resetApiState());
//         dispatch(accidentApi.util.resetApiState());
//         dispatch(travelApi.util.resetApiState());
//         dispatch(maintenanceAutopartsApi.util.resetApiState());
//         dispatch(equipmentApi.util.resetApiState());
//         dispatch(petApi.util.resetApiState());
//         dispatch(vetApi.util.resetApiState());
//         dispatch(otherRecordsApi.util.resetApiState());
//         dispatch(recordsApi.util.resetApiState());
//         await persistor.purge();
//       }, 150);
//       navigation.goBack();
//     }
//   };
//   return (
//     <>
//       <CustomHeader
//         title={`${capitalizeFirstLetter(selectedMechanic == "VEHICLE_SERVICE" ? "Vehicle Maintenance" : selectedMechanic)} Details`}
//         routeName={routes?.main.autoPartsDetails}
//         disabled={true}
//         OnEditPress={() => {
//           if (selectedMechanic === "CUSTOM") {
//             navigation.navigate(routes?.main?.editcustomrecords, {
//               editableData: dataToShow, // Pass formatted editable data here\
//               type: selectedMechanic,
//               originalData: result,
//               attachments: attachments,
//               id: item?._id,
//             });
//           } else {
//             navigation.navigate(routes?.main?.editautoparts, {
//               editableData: dataToShow, // Pass formatted editable data here\
//               type: selectedMechanic,
//               originalData: result,
//               attachments: attachments,
//               id: item?._id,
//             });
//           }

//         }}
//       />
//       <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
//         {/* Overview Section */}
//         <View style={styles.batterycontainer}>
//           <View style={styles.heading}>
//             <CustomText
//               text="Overview"
//               color={colors.text.dimBlack}
//               font={fonts.clash.regular}
//               size={font.h6}
//             />
//           </View>
//           <FlashList
//             scrollEnabled={false}
//             data={dataToShow}
//             numColumns={2}
//             keyExtractor={item => item.id}
//             renderItem={DataRenderer}
//             estimatedItemSize={42}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => (
//               <View style={{ height: spacing?.large }} />
//             )}
//           />
//         </View>

//         {/* Attachments Section */}
//         <View style={[styles.batterycontainer]}>
//           <View style={styles.heading}>
//             <CustomText
//               text="Attachments"
//               color={colors.text.dimBlack}
//               font={fonts.clash.regular}
//               size={font.h6}
//             />
//           </View>
//           <FlashList
//             scrollEnabled={false}
//             data={attachments}
//             ListEmptyComponent={() => { return <EmptyDataComponent message="No Attachments" /> }}
//             numColumns={2}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => {
//               LOG('Attachment Image URL', item);
//               return (
//                 <>
//                   <TouchableOpacity onPress={() => openModal(item.image)}>
//                     <Image
//                       source={item?.image}
//                       resizeMode="cover"
//                       style={{
//                         width: vh * 20,
//                         height: vh * 15,
//                         borderRadius: 10,
//                         marginBottom: vh * 2,
//                       }}
//                       fallback
//                       defaultSource={appImages.placeholder}
//                     />
//                   </TouchableOpacity>
//                 </>
//               );
//             }}
//             estimatedItemSize={42}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => (
//               <View style={{ height: spacing?.large }} />
//             )}
//           />
//         </View>

//         {/* Delete Button */}
//         <View style={{ marginHorizontal: 20 }}>
//           {isLoading1 ? (
//             <ActivityLoader color={colors.theme.secondary} />
//           ) : (
//             <MainButton
//               style={styles.submitButton}
//               title="Delete"
//               onPress={() => {
//                 setIsLoading1(true);
//                 setTimeout(() => {
//                   setIsLoading1(false);
//                   setModalVisible1(true);
//                 }, 2000);
//               }}
//             />
//           )}
//         </View>

//         {/* Image Modal */}
//         <Modal visible={isModalVisible} transparent={true} animationType="fade">
//           <View style={styles.modalContainer}>
//             <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
//               <CustomText
//                 text="✕"
//                 color={colors.text.white}
//                 font={fonts.clash.bold}
//                 size={font.small}
//               />
//             </TouchableOpacity>
//             {selectedImage && (
//               <Image
//                 source={selectedImage}
//                 style={styles.fullImage}
//                 resizeMode="contain"
//               />
//             )}
//           </View>
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <ModalComponent
//           isVisible={isModalVisible1}
//           onClose={() => setModalVisible1(false)}
//           onPressCross={() => {
//             setModalVisible1(false);
//           }}
//           title="Delete Record"
//           message="Are you sure you want to delete this record?"
//           bin
//           buttonText1="No"
//           buttonText="Yes"
//           onButtonPress={handleDelete}
//         // onButtonPress={() => {
//         //   setModalVisible1(false);
//         //   setTimeout(() => {
//         //     navigation?.goBack();
//         //   }, 1000);
//         // }}
//         />
//       </ScrollView>
//     </>
//   );
// };

// export default AutoPartsDetails;


// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { FlashList } from '@shopify/flash-list';
// import Image from 'react-native-fast-image';
// import CustomHeader from '../../../Components/CustomHeader';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import { MainButton } from '../../../Components/Buttons/MainButton';
// import ModalComponent from '../../../Components/ModalComponent';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import fonts from '../../../Assets/fonts';
// import { appImages } from '../../../Assets/Images';
// import { colors } from '../../../theme/colors';
// import { font, spacing } from '../../../theme/styles';
// import { styles } from './styles';
// import routes from '../../../Navigation/routes';
// import { formatDate, LOG, timeAgo } from '../../../Utils/helperFunction';
// import { imageServer } from '../../../Api/configs';
// import { vh, vw } from '../../../theme/units';
// import {
//   recordsApi,
//   useDeleteRecordsMutation,
// } from '../../../Api/recordsApiSlice';
// import { executeApiRequest } from '../../../Api/methods/method';
// import { persistor } from '../../../Redux/store';
// import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
// import { useDispatch } from 'react-redux';
// import { autopartsApi } from '../../../Api/autopartsApiSlice';
// import { gasApi } from '../../../Api/gasApiSlice';
// import { accidentApi } from '../../../Api/accidentApiSlice';
// import { travelApi } from '../../../Api/travelApiSlice';
// import { maintenanceAutopartsApi } from '../../../Api/mainteinanceAutopartsApiSlice';
// import { equipmentApi } from '../../../Api/equipmentApiSlice';
// import { petApi } from '../../../Api/petApiSlice';
// import { vetApi } from '../../../Api/vetApiSlice';
// import EmptyDataComponent from '../../../Components/EmptyDataComponent';

// const formatKeyToTitle = key => {
//   return key
//     .replace(/([A-Z])/g, ' $1') // camelCase to space
//     .replace(/[_\[\]\.]/g, ' ') // remove symbols
//     .replace(/\s+/g, ' ')
//     .trim()
//     .replace(/^./, str => str.toUpperCase());
// };

// const normalizeData = (data, parentKey = '') => {
//   const normalized = [];

//   // If array, iterate over each item
//   if (Array.isArray(data)) {
//     data.forEach((item, index) => {
//       const newKey = `${parentKey}[${index}]`;
//       if (typeof item === 'object' && item !== null) {
//         normalized.push(...normalizeData(item, newKey));
//       } else {
//         normalized.push({
//           id: newKey,
//           title: `${formatKeyToTitle(parentKey)} ${index + 1}`,
//           detail: item === null || item === undefined || item === '' ? 'N/A' : item.toString(),
//         });
//       }
//     });
//     return normalized;
//   }

//   // If plain object
//   if (typeof data === 'object' && data !== null) {
//     Object.entries(data).forEach(([key, value]) => {
//       const fullKey = parentKey ? `${parentKey}.${key}` : key;

//       if (
//         value !== undefined &&
//         key !== '__v' &&
//         key !== '_id' &&
//         key !== 'userId' &&
//         key !== 'createdAt' &&
//         key !== 'updatedAt' &&
//         key !== 'vehicleId' &&
//         key !== 'store' &&
//         key !== 'petId' &&
//         key !== 'mechanicId' &&
//         key !== 'sellerId' &&
//         key !== 'storeId' &&
//         key !== 'workerId' &&
//         key !== 'notes' &&
//         key !== 'gallery' &&
//         key !== 'autoPartIds' &&
//         key !== 'autoParts' &&
//         key !== 'attachments' &&
//         key !== 'fieldId' &&
//         key !== 'categoryId' &&
//         key !== 'type' &&
//         key !== 'label' &&
//         key !== 'serviceDate' // Added as per your latest code
//       ) {
//         let detail = value;

//         // Handle known nested keys with special formatting
//         if (typeof value === 'object' && !Array.isArray(value)) {
//           if (key === 'pet' && value?.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Pet Name',
//               detail: value.name === null || value.name === undefined || value.name === '' ? 'N/A' : value.name.toString(),
//             });
//           } else if (key === 'mechanic' && value?.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Mechanic Name',
//               detail: value.name === null || value.name === undefined || value.name === '' ? 'N/A' : value.name.toString(),
//             });
//           } else if (key === 'store' && value?.name) {
//             normalized.push({
//               id: `${fullKey}.name`,
//               title: 'Store Name',
//               detail: value.name === null || value.name === undefined || value.name === '' ? 'N/A' : value.name.toString(),
//             });
//           } else if (key === 'vehicle' && value?.vehicleDetails?.make) {
//             normalized.push({
//               id: `${fullKey}.vehicleDetails.make`,
//               title: 'Vehicle Make',
//               detail: value.vehicleDetails.make === null || value.vehicleDetails.make === undefined || value.vehicleDetails.make === '' ? 'N/A' : value.vehicleDetails.make.toString(),
//             });
//           } else {
//             // Recursively normalize nested object
//             normalized.push(...normalizeData(value, fullKey));
//           }
//           return;
//         }

//         // If it's an array
//         if (Array.isArray(value)) {
//           normalized.push(...normalizeData(value, fullKey));
//           return;
//         }

//         // Handle null, undefined, or empty string values
//         if (value === null || value === undefined || value === '') {
//           normalized.push({
//             id: fullKey,
//             title: formatKeyToTitle(key),
//             detail: 'N/A',
//           });
//           return;
//         }

//         // Format special values
//         if (key.toLowerCase().includes('date')) {
//           try {
//             const date = new Date(value);
//             detail = date.toLocaleDateString();
//             if (detail === 'Invalid Date') detail = 'N/A';
//           } catch {
//             detail = 'N/A';
//           }
//         } else if (
//           key.toLowerCase().includes('expense') ||
//           key.toLowerCase().includes('cost') ||
//           key === 'price' ||
//           key === 'payment' ||
//           key === 'totalPrice' ||
//           key === 'repairPrice' ||
//           key === 'partsCost' ||
//           key === 'laborCost' ||
//           key === 'estimatedMaintenancePrice' ||
//           key === 'actualMaintenancePrice' ||
//           key === 'totalMaintenanceCost' ||
//           key === 'warrantyPrice'
//         ) {
//           detail = `$ ${value}`;
//         }

//         normalized.push({
//           id: fullKey,
//           title: formatKeyToTitle(key),
//           detail: detail.toString(),
//         });
//       }
//     });
//   }

//   return normalized;
// };

// const extractRequiredData = item => {
//   if (!item) return null;

//   const { vehicle, vehicleDetails, ...rest } = item;

//   // Replace null, undefined, or empty string with "N/A" for non-excluded fields
//   const filteredData = {};
//   Object.entries(rest).forEach(([key, value]) => {
//     if (
//       key !== '__v' &&
//       key !== '_id' &&
//       key !== 'userId' &&
//       key !== 'createdAt' &&
//       key !== 'updatedAt' &&
//       key !== 'vehicleId' &&
//       key !== 'store' &&
//       key !== 'petId' &&
//       key !== 'mechanicId' &&
//       key !== 'sellerId' &&
//       key !== 'storeId' &&
//       key !== 'workerId' &&
//       key !== 'notes' &&
//       key !== 'gallery' &&
//       key !== 'autoPartIds' &&
//       key !== 'autoParts' &&
//       key !== 'attachments' &&
//       key !== 'fieldId' &&
//       key !== 'categoryId' &&
//       key !== 'type' &&
//       key !== 'label' &&
//       key !== 'serviceDate'
//     ) {
//       filteredData[key] = value === null || value === undefined || value === '' ? 'N/A' : value;
//     } else {
//       filteredData[key] = value; // Keep excluded fields as-is
//     }
//   });

//   // Add make from vehicle.vehicleDetails.make or vehicleDetails.make
//   filteredData.make = vehicle?.vehicleDetails?.make || vehicleDetails?.make || 'N/A';

//   console.log('filteredData', filteredData);

//   return filteredData;
// };

// // Data Renderer
// const DataRenderer = ({ item }) => {
//   console.log('itemitemitem',item);
  
//   return (
//     <View>
//       <CustomText
//         text={item.title}
//         color={colors.text.light}
//         size={font.medium}
//         font={fonts.benzin.semibold}
//         style={{ width: vw * 27 }}
//         numberOfLines={2}
//       />
//       <CustomText
//         text={item.title == "Warranty Expiration" ? formatDate(item.detail) : item.detail}
//         color={colors.text.dimBlack}
//         size={font.medium}
//         font={fonts.benzin.regular}
//       />
//     </View>
//   );
// };

// const getAttachments = item => {
//   console.log('itemitem', item?.attachments);
//   // Check for attachments in three possible locations
//   const attachmentsSource =
//     item?.attachments ||
//     item?.partDetails?.attachments ||
//     item?.repairPartDetails?.attachments ||
//     [];

//   // Map the attachments to the desired format
//   const attachments =
//     attachmentsSource.length > 0
//       ? attachmentsSource.map((img, index) => {
//           const imageUrl =
//             typeof img === 'string' ? `${imageServer}${img}` : appImages.scan1;
//           return { id: index, image: { uri: imageUrl } };
//         })
//       : [];

//   return attachments;
// };

// const AutoPartsDetails = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { selectedMechanic, item } = route.params; // item is the selected record
//   console.log('SELECTED: ', selectedMechanic);
//   console.log('itemitemdkjjddjk: ', item);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isModalVisible1, setModalVisible1] = useState(false);
//   const [isLoading1, setIsLoading1] = useState(false);
//   const dispatch = useDispatch();
//   const [deleteRecords, { isLoading }] = useDeleteRecordsMutation();
//   console.log('Item', item);

//   const result = extractRequiredData(item);
//   console.log('RESULT: ', result);

//   // Handle custom category data
//   let dataToShow = [];

//   if (result?.data && item?.category?.fields) {
//     // Custom record — map data array using category.fields
//     const fieldMap = {};
//     item.category.fields.forEach(field => {
//       fieldMap[field._id] = field.label;
//     });

//     dataToShow = result.data.map((entry, index) => {
//       const fieldLabel = fieldMap[entry.fieldId] || `Field ${index + 1}`;
//       let detailValue = entry.value;

//       // Format date-like values
//       if (
//         typeof entry.value === 'string' &&
//         entry.value.match(/^\d{4}-\d{2}-\d{2}T/)
//       ) {
//         try {
//           const date = new Date(entry.value);
//           detailValue = date.toLocaleDateString();
//           if (detailValue === 'Invalid Date') detailValue = 'N/A';
//         } catch {
//           detailValue = 'N/A';
//         }
//       }

//       return {
//         id: entry.fieldId,
//         title: fieldLabel,
//         detail: detailValue === null || detailValue === undefined || detailValue === '' ? 'N/A' : detailValue,
//       };
//     });

//     console.log('CUSTOM DATA TO SHOW:', dataToShow);
//   } else {
//     // Fallback for non-custom records
//     dataToShow = normalizeData(result || {});
//   }

//   console.log('dataToShow', dataToShow);
//   console.log(item, 'itemitemisstemitem');

//   const attachments = getAttachments(item);
//   console.log('Attachments: ', attachments);

//   const openModal = image => {
//     setSelectedImage(image);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedImage(null);
//   };

//   const capitalizeFirstLetter = text => {
//     if (!text) return '';
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };

//   const handleDelete = async () => {
//     console.log('TYPE SENT ON API: ', selectedMechanic);
//     const response = await executeApiRequest({
//       apiCallFunction: deleteRecords,
//       params: {
//         id: item?._id,
//         type: selectedMechanic,
//       },
//       toast: true,
//       timeout: 30000,
//     });

//     console.log('Delete Success:', response);
//     if (response) {
//       setModalVisible1(false);
//       setTimeout(async () => {
//         dispatch(autopartsApi.util.resetApiState());
//         dispatch(gasApi.util.resetApiState());
//         dispatch(accidentApi.util.resetApiState());
//         dispatch(travelApi.util.resetApiState());
//         dispatch(maintenanceAutopartsApi.util.resetApiState());
//         dispatch(equipmentApi.util.resetApiState());
//         dispatch(petApi.util.resetApiState());
//         dispatch(vetApi.util.resetApiState());
//         dispatch(otherRecordsApi.util.resetApiState());
//         dispatch(recordsApi.util.resetApiState());
//         await persistor.purge();
//       }, 150);
//       navigation.goBack();
//     }
//   };

//   return (
//     <>
//       <CustomHeader
//         title={`${capitalizeFirstLetter(selectedMechanic === "VEHICLE_SERVICE" ? "Vehicle Maintenance" : selectedMechanic)} Details`}
//         routeName={routes?.main.autoPartsDetails}
//         disabled={true}
//         OnEditPress={() => {
//           if (selectedMechanic === "CUSTOM") {
//             navigation.navigate(routes?.main?.editcustomrecords, {
//               editableData: dataToShow,
//               type: selectedMechanic,
//               originalData: result,
//               attachments: attachments,
//               id: item?._id,
//             });
//           } else {
//             navigation.navigate(routes?.main?.editautoparts, {
//               editableData: dataToShow,
//               type: selectedMechanic,
//               originalData: result,
//               attachments: attachments,
//               id: item?._id,
//             });
//           }
//         }}
//       />
//       <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
//         {/* Overview Section */}
//         <View style={styles.batterycontainer}>
//           <View style={styles.heading}>
//             <CustomText
//               text="Overview"
//               color={colors.text.dimBlack}
//               font={fonts.clash.regular}
//               size={font.h6}
//             />
//           </View>
//           <FlashList
//             scrollEnabled={false}
//             data={dataToShow}
//             numColumns={2}
//             keyExtractor={item => item.id}
//             renderItem={DataRenderer}
//             estimatedItemSize={42}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => (
//               <View style={{ height: spacing?.large }} />
//             )}
//             ListEmptyComponent={() => <EmptyDataComponent message="No Data Available" />}
//           />
//         </View>

//         {/* Attachments Section */}
//         <View style={[styles.batterycontainer]}>
//           <View style={styles.heading}>
//             <CustomText
//               text="Attachments"
//               color={colors.text.dimBlack}
//               font={fonts.clash.regular}
//               size={font.h6}
//             />
//           </View>
//           <FlashList
//             scrollEnabled={false}
//             data={attachments}
//             ListEmptyComponent={() => <EmptyDataComponent message="No Attachments" />}
//             numColumns={2}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({ item }) => {
//               console.log('Attachment Image URL', item);
//               return (
//                 <TouchableOpacity onPress={() => openModal(item.image)}>
//                   <Image
//                     source={item?.image}
//                     resizeMode="cover"
//                     style={{
//                       width: vh * 20,
//                       height: vh * 15,
//                       borderRadius: 10,
//                       marginBottom: vh * 2,
//                     }}
//                     fallback
//                     defaultSource={appImages.placeholder}
//                   />
//                 </TouchableOpacity>
//               );
//             }}
//             estimatedItemSize={42}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={() => (
//               <View style={{ height: spacing?.large }} />
//             )}
//           />
//         </View>

//         {/* Delete Button */}
//         <View style={{ marginHorizontal: 20 }}>
//           {isLoading1 ? (
//             <ActivityLoader color={colors.theme.secondary} />
//           ) : (
//             <MainButton
//               style={styles.submitButton}
//               title="Delete"
//               onPress={() => {
//                 setIsLoading1(true);
//                 setTimeout(() => {
//                   setIsLoading1(false);
//                   setModalVisible1(true);
//                 }, 2000);
//               }}
//             />
//           )}
//         </View>

//         {/* Image Modal */}
//         <Modal visible={isModalVisible} transparent={true} animationType="fade">
//           <View style={styles.modalContainer}>
//             <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
//               <CustomText
//                 text="✕"
//                 color={colors.text.white}
//                 font={fonts.clash.bold}
//                 size={font.small}
//               />
//             </TouchableOpacity>
//             {selectedImage && (
//               <Image
//                 source={selectedImage}
//                 style={styles.fullImage}
//                 resizeMode="contain"
//               />
//             )}
//           </View>
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <ModalComponent
//           isVisible={isModalVisible1}
//           onClose={() => setModalVisible1(false)}
//           onPressCross={() => setModalVisible1(false)}
//           title="Delete Record"
//           message="Are you sure you want to delete this record?"
//           bin
//           buttonText1="No"
//           buttonText="Yes"
//           onButtonPress={handleDelete}
//         />
//       </ScrollView>
//     </>
//   );
// };

// export default AutoPartsDetails;


import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { MainButton } from '../../../Components/Buttons/MainButton';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
import fonts from '../../../Assets/fonts';
import { appImages } from '../../../Assets/Images';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { styles } from './styles';
import routes from '../../../Navigation/routes';
import { formatDate, LOG, timeAgo } from '../../../Utils/helperFunction';
import { imageServer } from '../../../Api/configs';
import { vh, vw } from '../../../theme/units';
import {
  recordsApi,
  useDeleteRecordsMutation,
} from '../../../Api/recordsApiSlice';
import { executeApiRequest } from '../../../Api/methods/method';
import { persistor } from '../../../Redux/store';
import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
import { useDispatch } from 'react-redux';
import { autopartsApi } from '../../../Api/autopartsApiSlice';
import { gasApi } from '../../../Api/gasApiSlice';
import { accidentApi } from '../../../Api/accidentApiSlice';
import { travelApi } from '../../../Api/travelApiSlice';
import { maintenanceAutopartsApi } from '../../../Api/mainteinanceAutopartsApiSlice';
import { equipmentApi } from '../../../Api/equipmentApiSlice';
import { petApi } from '../../../Api/petApiSlice';
import { vetApi } from '../../../Api/vetApiSlice';
import EmptyDataComponent from '../../../Components/EmptyDataComponent';

const formatKeyToTitle = key => {
  return key
    .replace(/([A-Z])/g, ' $1') // camelCase to space
    .replace(/[_\[\]\.]/g, ' ') // remove symbols
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, str => str.toUpperCase());
};

const normalizeData = (data, parentKey = '') => {
  const normalized = [];

  // If array, iterate over each item
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const newKey = `${parentKey}[${index}]`;
      if (typeof item === 'object' && item !== null) {
        normalized.push(...normalizeData(item, newKey));
      } else {
        normalized.push({
          id: newKey,
          title: `${formatKeyToTitle(parentKey)} ${index + 1}`,
          detail: item === null || item === undefined || item === '' ? '' : item.toString(),
        });
      }
    });
    return normalized;
  }

  // If plain object
  if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        value !== undefined &&
        key !== '__v' &&
        key !== '_id' &&
        key !== 'userId' &&
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'vehicleId' &&
        key !== 'store' &&
        key !== 'petId' &&
        key !== 'mechanicId' &&
        key !== 'sellerId' &&
        key !== 'storeId' &&
        key !== 'workerId' &&
        key !== 'notes' &&
        key !== 'gallery' &&
        key !== 'autoPartIds' &&
        key !== 'autoParts' &&
        key !== 'attachments' &&
        key !== 'fieldId' &&
        key !== 'categoryId' &&
        key !== 'type' &&
        key !== 'label' &&
        key !== 'serviceDate'
      ) {
        let detail = value;

        // Handle known nested keys with special formatting
        if (typeof value === 'object' && !Array.isArray(value)) {
          if (key === 'pet' && value?.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Pet Name',
              detail: value.name === null || value.name === undefined || value.name === '' ? '' : value.name.toString(),
            });
          } else if (key === 'mechanic' && value?.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Mechanic Name',
              detail: value.name === null || value.name === undefined || value.name === '' ? '' : value.name.toString(),
            });
          } else if (key === 'store' && value?.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Store Name',
              detail: value.name === null || value.name === undefined || value.name === '' ? '' : value.name.toString(),
            });
          } else if (key === 'vehicle' && value?.vehicleDetails?.make) {
            normalized.push({
              id: `${fullKey}.vehicleDetails.make`,
              title: 'Vehicle Make',
              detail: value.vehicleDetails.make === null || value.vehicleDetails.make === undefined || value.vehicleDetails.make === '' ? '' : value.vehicleDetails.make.toString(),
            });
          } else {
            // Recursively normalize nested object
            normalized.push(...normalizeData(value, fullKey));
          }
          return;
        }

        // If it's an array
        if (Array.isArray(value)) {
          normalized.push(...normalizeData(value, fullKey));
          return;
        }

        // Handle null, undefined, or empty string values
        if (value === null || value === undefined || value === '') {
          normalized.push({
            id: fullKey,
            title: formatKeyToTitle(key),
            detail: '',
          });
          return;
        }

        // Format special values
        if (key.toLowerCase().includes('date')) {
          try {
            const date = new Date(value);
            detail = date.toLocaleDateString();
            if (detail === 'Invalid Date') detail = '';
          } catch {
            detail = '';
          }
        } else if (
          key.toLowerCase().includes('expense') ||
          key.toLowerCase().includes('cost') ||
          key === 'price' ||
          key === 'payment' ||
          key === 'totalPrice' ||
          key === 'repairPrice' ||
          key === 'partsCost' ||
          key === 'laborCost' ||
          key === 'estimatedMaintenancePrice' ||
          key === 'actualMaintenancePrice' ||
          key === 'totalMaintenanceCost' ||
          key === 'warrantyPrice'
        ) {
          detail = `$ ${value}`;
        }

        normalized.push({
          id: fullKey,
          title: formatKeyToTitle(key),
          detail: detail.toString(),
        });
      }
    });
  }

  return normalized;
};

const extractRequiredData = item => {
  if (!item) return null;

  const { vehicle, vehicleDetails, ...rest } = item;

  // Replace null, undefined, or empty string with "" for non-excluded fields
  const filteredData = {};
  Object.entries(rest).forEach(([key, value]) => {
    if (
      key !== '__v' &&
      key !== '_id' &&
      key !== 'userId' &&
      key !== 'createdAt' &&
      key !== 'updatedAt' &&
      key !== 'vehicleId' &&
      key !== 'store' &&
      key !== 'petId' &&
      key !== 'mechanicId' &&
      key !== 'sellerId' &&
      key !== 'storeId' &&
      key !== 'workerId' &&
      key !== 'notes' &&
      key !== 'gallery' &&
      key !== 'autoPartIds' &&
      key !== 'autoParts' &&
      key !== 'attachments' &&
      key !== 'fieldId' &&
      key !== 'categoryId' &&
      key !== 'type' &&
      key !== 'label' &&
      key !== 'serviceDate'
    ) {
      filteredData[key] = value === null || value === undefined || value === '' ? '' : value;
    } else {
      filteredData[key] = value; // Keep excluded fields as-is
    }
  });

  // Add make from vehicle.vehicleDetails.make or vehicleDetails.make
  filteredData.make = vehicle?.vehicleDetails?.make || vehicleDetails?.make || '';

  console.log('filteredData', filteredData);

  return filteredData;
};

// Data Renderer
const DataRenderer = ({ item }) => {
  console.log('itemitemitem', item);

  return (
    <View>
      <CustomText
        text={item.title}
        color={colors.text.light}
        size={font.medium}
        font={fonts.benzin.semibold}
        style={{ width: vw * 27 }}
        numberOfLines={2}
      />
      <CustomText
        text={item.title === 'Warranty Expiration' ? formatDate(item.detail) : item.detail}
        color={colors.text.dimBlack}
        size={font.medium}
        font={fonts.benzin.regular}
      />
    </View>
  );
};

const getAttachments = item => {
  console.log('itemitem', item?.attachments);
  // Check for attachments in three possible locations
  const attachmentsSource =
    item?.attachments ||
    item?.partDetails?.attachments ||
    item?.repairPartDetails?.attachments ||
    [];

  // Map the attachments to the desired format
  const attachments =
    attachmentsSource.length > 0
      ? attachmentsSource.map((img, index) => {
          const imageUrl =
            typeof img === 'string' ? `${imageServer}${img}` : appImages.scan1;
          return { id: index, image: { uri: imageUrl } };
        })
      : [];

  return attachments;
};

const AutoPartsDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedMechanic, item } = route.params; // item is the selected record
  console.log('SELECTED: ', selectedMechanic);
  console.log('itemitemdkjjddjk: ', item);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const dispatch = useDispatch();
  const [deleteRecords, { isLoading }] = useDeleteRecordsMutation();
  console.log('Item', item);

  const result = extractRequiredData(item);
  console.log('RESULT: ', result);

  // Handle custom category data
  let dataToShow = [];

  if (result?.data && item?.category?.fields) {
    // Custom record — map data array using category.fields
    const fieldMap = {};
    item.category.fields.forEach(field => {
      fieldMap[field._id] = field.label;
    });

    dataToShow = result.data.map((entry, index) => {
      const fieldLabel = fieldMap[entry.fieldId] || `Field ${index + 1}`;
      let detailValue = entry.value;

      // Format date-like values
      if (
        typeof entry.value === 'string' &&
        entry.value.match(/^\d{4}-\d{2}-\d{2}T/)
      ) {
        try {
          const date = new Date(entry.value);
          detailValue = date.toLocaleDateString();
          if (detailValue === 'Invalid Date') detailValue = '';
        } catch {
          detailValue = '';
        }
      }

      return {
        id: entry.fieldId,
        title: fieldLabel,
        detail: detailValue === null || detailValue === undefined || detailValue === '' ? '' : detailValue,
      };
    });

    console.log('CUSTOM DATA TO SHOW:', dataToShow);
  } else {
    // Fallback for non-custom records
    dataToShow = normalizeData(result || {});
  }

  console.log('dataToShow', dataToShow);
  console.log(item, 'itemitemisstemitem');

  const attachments = getAttachments(item);
  console.log('Attachments: ', attachments);

  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const capitalizeFirstLetter = text => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleDelete = async () => {
    console.log('TYPE SENT ON API: ', selectedMechanic);
    const response = await executeApiRequest({
      apiCallFunction: deleteRecords,
      params: {
        id: item?._id,
        type: selectedMechanic,
      },
      toast: true,
      timeout: 30000,
    });

    console.log('Delete Success:', response);
    if (response) {
      setModalVisible1(false);
      setTimeout(async () => {
        dispatch(autopartsApi.util.resetApiState());
        dispatch(gasApi.util.resetApiState());
        dispatch(accidentApi.util.resetApiState());
        dispatch(travelApi.util.resetApiState());
        dispatch(maintenanceAutopartsApi.util.resetApiState());
        dispatch(equipmentApi.util.resetApiState());
        dispatch(petApi.util.resetApiState());
        dispatch(vetApi.util.resetApiState());
        dispatch(otherRecordsApi.util.resetApiState());
        dispatch(recordsApi.util.resetApiState());
        await persistor.purge();
      }, 150);
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomHeader
        title={`${capitalizeFirstLetter(selectedMechanic === "VEHICLE_SERVICE" ? "Vehicle Maintenance" : selectedMechanic)} Details`}
        routeName={routes?.main.autoPartsDetails}
        disabled={true}
        OnEditPress={() => {
          if (selectedMechanic === "CUSTOM") {
            navigation.navigate(routes?.main?.editcustomrecords, {
              editableData: dataToShow,
              type: selectedMechanic,
              originalData: result,
              attachments: attachments,
              id: item?._id,
            });
          } else {
            navigation.navigate(routes?.main?.editautoparts, {
              editableData: dataToShow,
              type: selectedMechanic,
              originalData: result,
              attachments: attachments,
              id: item?._id,
            });
          }
        }}
      />
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
        {/* Overview Section */}
        <View style={styles.batterycontainer}>
          <View style={styles.heading}>
            <CustomText
              text="Overview"
              color={colors.text.dimBlack}
              font={fonts.clash.regular}
              size={font.h6}
            />
          </View>
          <FlashList
            scrollEnabled={false}
            data={dataToShow}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={DataRenderer}
            estimatedItemSize={42}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: spacing?.large }} />
            )}
            ListEmptyComponent={() => <EmptyDataComponent message="No Data Available" />}
          />
        </View>

        {/* Attachments Section */}
        <View style={[styles.batterycontainer]}>
          <View style={styles.heading}>
            <CustomText
              text="Attachments"
              color={colors.text.dimBlack}
              font={fonts.clash.regular}
              size={font.h6}
            />
          </View>
          <FlashList
            scrollEnabled={false}
            data={attachments}
            ListEmptyComponent={() => <EmptyDataComponent message="No Attachments" />}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              console.log('Attachment Image URL', item);
              return (
                <TouchableOpacity onPress={() => openModal(item.image)}>
                  <Image
                    source={item?.image}
                    resizeMode="cover"
                    style={{
                      width: vh * 20,
                      height: vh * 15,
                      borderRadius: 10,
                      marginBottom: vh * 2,
                    }}
                    fallback
                    defaultSource={appImages.placeholder}
                  />
                </TouchableOpacity>
              );
            }}
            estimatedItemSize={42}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: spacing?.large }} />
            )}
          />
        </View>

        {/* Delete Button */}
        <View style={{ marginHorizontal: 20 }}>
          {isLoading1 ? (
            <ActivityLoader color={colors.theme.secondary} />
          ) : (
            <MainButton
              style={styles.submitButton}
              title="Delete"
              onPress={() => {
                setIsLoading1(true);
                setTimeout(() => {
                  setIsLoading1(false);
                  setModalVisible1(true);
                }, 2000);
              }}
            />
          )}
        </View>

        {/* Image Modal */}
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <CustomText
                text="✕"
                color={colors.text.white}
                font={fonts.clash.bold}
                size={font.small}
              />
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={selectedImage}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ModalComponent
          isVisible={isModalVisible1}
          onClose={() => setModalVisible1(false)}
          onPressCross={() => setModalVisible1(false)}
          title="Delete Record"
          message="Are you sure you want to delete this record?"
          bin
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={handleDelete}
        />
      </ScrollView>
    </>
  );
};

export default AutoPartsDetails;