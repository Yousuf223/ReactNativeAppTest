import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {MainButton} from '../../../Components/Buttons/MainButton';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
import fonts from '../../../Assets/fonts';
import {appImages} from '../../../Assets/Images';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {styles} from './styles';
import routes from '../../../Navigation/routes';
import {LOG} from '../../../Utils/helperFunction';
import {imageServer} from '../../../Api/configs';
import {vh, vw} from '../../../theme/units';
import {
  recordsApi,
  useDeleteRecordsMutation,
} from '../../../Api/recordsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import {persistor} from '../../../Redux/store';
import {otherRecordsApi} from '../../../Api/otherRecordsApiSlice';
import {useDispatch} from 'react-redux';
import {autopartsApi} from '../../../Api/autopartsApiSlice';
import {gasApi} from '../../../Api/gasApiSlice';
import {accidentApi} from '../../../Api/accidentApiSlice';
import {travelApi} from '../../../Api/travelApiSlice';
import {maintenanceAutopartsApi} from '../../../Api/mainteinanceAutopartsApiSlice';
import {equipmentApi} from '../../../Api/equipmentApiSlice';
import {petApi} from '../../../Api/petApiSlice';
import {vetApi} from '../../../Api/vetApiSlice';
import DropDown from '../../../Components/DropDown';
import {
  draftsApi,
  useDeleteDraftRecordsMutation,
} from '../../../Api/draftsApiSlice';

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
          detail: item.toString(),
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
        value !== null &&
        value !== undefined &&
        key !== '__v' &&
        key !== '_id' &&
        key !== 'userId' &&
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'vehicleId' &&
        key !== 'store' &&
        key !== 'vehicleId' &&
        key !== 'petId' &&
        key !== 'mechanicId' &&
        key !== 'sellerId' &&
        key !== 'storeId' &&
        key !== 'notes' &&
        key !== 'gallery' &&
        key !== 'autoPartIds' &&
        key !== 'autoParts' &&
        key !== 'attachments'
      ) {
        let detail = value;

        // Handle known nested keys with special formatting
        if (typeof value === 'object' && !Array.isArray(value)) {
          if (key === 'pet' && value.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Pet Name',
              detail: value.name,
            });
          } else if (key === 'mechanic' && value.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Mechanic Name',
              detail: value.name,
            });
          } else if (key === 'store' && value.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Store Name',
              detail: value.name,
            });
          } else if (key === 'vehicle' && value.name) {
            normalized.push({
              id: `${fullKey}.name`,
              title: 'Vehicle Name',
              detail: value.name,
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

        // Format special values
        if (key.toLowerCase().includes('date')) {
          detail = new Date(value).toLocaleDateString();
        } else if (
          key.toLowerCase().includes('expense') ||
          key.toLowerCase().includes('cost') ||
          key === 'price' ||
          key === 'payment' ||
          key === 'totalPrice'
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

// Data Renderer
const DataRenderer = ({item}) => {
  return (
    <View>
      <CustomText
        text={item.title}
        color={colors.text.light}
        size={font.medium}
        font={fonts.benzin.semibold}
        style={{width: vw * 27}}
        numberOfLines={2}
      />
      <CustomText
        text={item.detail}
        color={colors.text.dimBlack}
        size={font.medium}
        font={fonts.benzin.regular}
      />
    </View>
  );
};

const getAttachments = item => {
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
          // Check if img is a string (URL) or object
          const imageUrl =
            typeof img === 'string' ? `${imageServer}${img}` : appImages.scan1; // Fallback to default if not a string
          return {id: index, image: {uri: imageUrl}};
        })
      : [
          {id: 1, image: appImages.placeholder},
          {id: 2, image: appImages.placeholder},
        ];

  return attachments;
};

const VehicleParts = [
  // {key: 0, displayValue: 'Auto Parts', apiValue: 'AUTOPART'},
  // {key: 1, displayValue: 'Repair', apiValue: 'REPAIR'},
  {key: 0, displayValue: 'Maintenance', apiValue: 'VEHICLE_SERVICE'},
  {key: 1, displayValue: 'Accident', apiValue: 'ACCIDENT'},
  {key: 2, displayValue: 'Gas', apiValue: 'GAS'},
];

const DraftDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {selectedMechanic, item} = route.params; // item is the selected record
  LOG('SELECTED: ', selectedMechanic);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const [categoryValue, setCategoryValue] = useState(false);

  const [isLoading1, setIsLoading1] = useState(false);
  const dispatch = useDispatch();
  const [deleteRecords, {isLoading}] = useDeleteDraftRecordsMutation();
  LOG('Item', item);

  const extractRequiredData = item => {
    if (!item) return null;

    const {vehicle, vehicleDetails, ...rest} = item;

    const filteredData = {
      ...rest,
      make: vehicle?.vehicleDetails?.make || vehicleDetails?.make || null,
    };

    return filteredData;
  };

  const result = extractRequiredData(item);
  LOG('RESULT: ', result);

  const dataToShow = normalizeData(result || {});

  const attachments = getAttachments(item);
  LOG('Attachments: ', attachments);

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

  const handleValueChange = value => {
    // Find the selected item based on the display value
    const selectedPart = VehicleParts.find(part => part.displayValue === value);
    const apiValue = selectedPart ? selectedPart.apiValue : null; // Get the corresponding API value
    LOG('API Value:', apiValue); // Use this value for your API call

    setCategoryValue(apiValue);
    // handleClearList()
  };

  const handleDelete = async () => {
    const response = await executeApiRequest({
      apiCallFunction: deleteRecords,
      params: {
        id: item?._id, // for the URL
      },
      toast: true,
      timeout: 30000,
    });

    LOG('Delete Success:', response);
    if (response) {
      setModalVisible1(false);
      setTimeout(async () => {
        dispatch(draftsApi.util.resetApiState());
        await persistor.purge();
      }, 150);
      navigation.goBack();
    }
  };
  return (
    <>
      <CustomHeader
        title={`${capitalizeFirstLetter(selectedMechanic)} Details`}
        routeName={routes?.main.draftdetails}
        disabled={true}
        OnEditPress={() => {
          if (!categoryValue) {
            Alert?.alert('Please Select Category To Proceed');
          }
          // else if (categoryValue === 'AUTOPART') {
          //   navigation?.navigate(routes?.main?.addautopartrecord, {
          //     attachments: attachments,
          //     draftId: item?._id,
          //   });
          // }
          // else if (categoryValue === 'REPAIR') {
          //   navigation?.navigate(routes?.main?.addrepairrecord, {
          //     attachments: attachments,
          //     draftId: item?._id,
          //   });
          // }
          else if (categoryValue === 'VEHICLE_SERVICE') {
            navigation?.navigate(routes?.main?.addmaintenancerecord, {
              attachments: attachments,
              draftId: item?._id,
            });
          } else if (categoryValue === 'ACCIDENT') {
            navigation?.navigate(routes?.main?.addaccidentrecord, {
              attachments: attachments,
              draftId: item?._id,
            });
          } else if (categoryValue === 'GAS') {
            navigation?.navigate(routes?.main?.addgasrecord, {
              attachments: attachments,
              draftId: item?._id,
            });
          }
        }}
      />
      <ScrollView contentContainerStyle={{gap: 10, paddingBottom: 20}}>
        {/* Overview Section */}
        <View style={styles.batterycontainer}>
          <View style={styles.heading}>
            <CustomText
              text="Select Category"
              color={colors.text.dimBlack}
              font={fonts.clash.regular}
              size={font.h6}
            />
          </View>
          <DropDown
            label={'Select'}
            placeholder={'Select Category'}
            textColor={
              categoryValue ? colors?.text?.dimBlack : colors?.text?.grey
            }
            onValueChange={handleValueChange} // Use the new handler
            dynamicData={VehicleParts.map(part => ({
              key: part.key,
              value: part.displayValue,
            }))} // Use display values for the dropdown
            style={{
              width: vw * 89,
              marginTop: vh * 3,
              alignSelf: 'center',
            }}
          />
          {/* <FlashList
            scrollEnabled={false}
            data={dataToShow}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={DataRenderer}
            estimatedItemSize={42}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{height: spacing?.large}} />
            )}
          /> */}
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
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              LOG('Attachment Image URL', item.image.uri);
              return (
                <>
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
                </>
              );
            }}
            estimatedItemSize={42}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{height: spacing?.large}} />
            )}
          />
        </View>

        {/* Delete Button */}
        <View style={{marginHorizontal: 20}}>
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
          onPressCross={() => {
            setModalVisible1(false);
          }}
          title="Delete Record"
          message="Are you sure you want to delete this record?"
          bin
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={handleDelete}
          // onButtonPress={() => {
          //   setModalVisible1(false);
          //   setTimeout(() => {
          //     navigation?.goBack();
          //   }, 1000);
          // }}
        />
      </ScrollView>
    </>
  );
};

export default DraftDetails;
