import {FlashList} from '@shopify/flash-list';
import React, {useRef, useState} from 'react';
import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import {appImages} from '../../../Assets/Images';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {vh, vw} from '../../../theme/units';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import BottomSheet from '../../../Components/BottomSheet';
import {BlurView} from '@react-native-community/blur';
import {
  MainButton,
  MainButtonWithGradient,
} from '../../../Components/Buttons/MainButton';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
const RepairsDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedMechanic} = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('selectedMechanicselectedMechanic', selectedMechanic);

  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };
  const overviewData = [
    {id: 1, detail: 'Toyota Prius 2023', title: 'Vehicle'},
    {id: 2, detail: 'September 20,2024', title: 'Date'},
  ];

  if (selectedMechanic === 'Accident') {
    overviewData.push({
      id: 3,
      detail: '3913 NE 163rd St north miami , FL 33160',
      title: 'Location',
    });
  }
  const repairData = [
    {
      id: 1,
      detail:
        selectedMechanic === 'Accident'
          ? 'James Anderson'
          : selectedMechanic === 'Gas'
          ? '08'
          : null,
      title:
        selectedMechanic === 'Accident'
          ? 'Other Driver Name'
          : selectedMechanic === 'Gas'
          ? 'It was hit and run case'
          : null,
    },
    {
      id: 2,
      detail:
        selectedMechanic === 'Accident'
          ? '+1 123 456 7890'
          : selectedMechanic === 'Gas'
          ? '$80.00'
          : null,
      title:
        selectedMechanic === 'Accident'
          ? 'Other Driver’s Contact Number'
          : selectedMechanic === 'Gas'
          ? 'Price'
          : null,
    },
    {
      id: 3,
      detail:
        selectedMechanic === 'Accident'
          ? 'It was hit and run case'
          : selectedMechanic === 'Gas'
          ? '35000'
          : null,
      title:
        selectedMechanic === 'Accident'
          ? 'Other Details'
          : selectedMechanic === 'Gas'
          ? 'Current Car Mileage'
          : null,
    },
  ];
  const ImageData = [
    {
      id: 1,
      image: appImages.scan1,
    },
    {
      id: 2,
      image: appImages.scan2,
    },
  ];
  const OverViewDataRender = ({item}) => {
    return (
      <View>
        <CustomText
          text={item.title}
          color={colors.text.light}
          size={font.medium}
          font={fonts.benzin.semibold}
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
  const PriceDataRender = ({item}) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: item.id === 4 ? '#EBEBEB' : 'transparent',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
        ]}>
        <CustomText
          text={item.title}
          color={colors.text.light}
          size={font.medium}
          font={fonts.benzin.semibold}
        />
        <CustomText
          text={`$${item.price}`}
          color={colors.text.dimBlack}
          size={font.medium}
          font={fonts.benzin.semibold}
        />
      </View>
    );
  };
  const AttachDataRender = ({item}) => {
    return (
      <TouchableOpacity onPress={() => openModal(item.image)}>
        <Image
          source={item.image}
          resizeMode="stretch"
          style={{width: 160, height: 120, borderRadius: 10}}
        />
      </TouchableOpacity>
    );
  };
  const OverViewDetailsRender = () => {
    return (
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
          data={overviewData}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={OverViewDataRender}
          estimatedItemSize={42}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: spacing?.large}} />
          )}
        />
      </View>
    );
  };
  const RepairDetailsRender = () => {
    return (
      <View style={styles.batterycontainer}>
        <View style={styles.heading}>
          <CustomText
            text={`${selectedMechanic} Details`}
            color={colors.text.dimBlack}
            font={fonts.clash.regular}
            size={font.h6}
          />
        </View>
        <FlashList
          scrollEnabled={false}
          data={repairData}
          keyExtractor={item => item.id.toString()}
          renderItem={OverViewDataRender}
          estimatedItemSize={42}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: spacing?.large}} />
          )}
        />

        <View style={{gap: 10}}>
          <CustomText
            text={'Attachments'}
            color={colors.text.dimBlack}
            size={font.medium}
            font={fonts.benzin.semibold}
          />
          <FlashList
            scrollEnabled={false}
            data={ImageData}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={AttachDataRender}
            estimatedItemSize={42}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{height: spacing?.large}} />
            )}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <CustomHeader
        title={`${selectedMechanic} Details`}
        routeName={routes?.main.repairsdetails}
        disabled={true}
        // OnEditPress={() => {
        //   if (selectedMechanic === 'Accident') {
        //     navigation.navigate(routes.main.addaccidentrecord, {
        //       editParams: selectedMechanic,
        //     });
        //   } else if (selectedMechanic === 'Gas') {
        //     navigation.navigate(routes.main.addgasrecord, {
        //       editParams: selectedMechanic,
        //     });
        //   } else {
        //     navigation?.navigate(routes?.main?.editrepairrecord);
        //   }
        // }}
      />
      <ScrollView contentContainerStyle={{gap: 10, paddingBottom: 20}}>
        {OverViewDetailsRender && OverViewDetailsRender()}
        {RepairDetailsRender && RepairDetailsRender()}
        <View style={{marginHorizontal: 20}}>
          {isLoading ? (
            <ActivityLoader color={colors.theme.secondary} />
          ) : (
            <MainButton
              style={styles.submitButton}
              title={'Delete'}
              disabled={isTaskSuccess}
              onPress={() => {
                setIsTaskSuccess(true);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setModalVisible1(true);
                }, 2000);
              }}
            />
          )}
        </View>
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
        <ModalComponent
          isVisible={isModalVisible1}
          onClose={() => setModalVisible1(false)}
          onPressCross={() => {
            setModalVisible1(false);
            setIsTaskSuccess(false);
          }}
          title="Delete Record"
          message="Are you sure you want to delete this record?"
          bin
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={() => {
            setModalVisible1(false);
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          }}
        />
      </ScrollView>
    </>
  );
};

export default RepairsDetails;
